import 'babel-polyfill';
import express from 'express';
import proxy from 'express-http-proxy';
import { matchRoutes } from 'react-router-config';

import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

import Routes from './client/Routes';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const app = express();

app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = `${HOST}:${PORT}`;
    return opts;
  } // not needed, just for this setup
}));

// expose this to outside world, we dont have to include public/bundle in script tag
app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore(req);

  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    // returns an array of promises
    return route.loadData ? route.loadData(store) : null;
  }).map((promise) => {
    if (promise) {
      return new Promise((resolve, reject) => {
        promise.then(resolve).catch(resolve);
      });
    }
  });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(400);
    }
    // node environment will have no idea what JSX is, so this throws an error without some tooling configuration
    // webpack and babel are required here
    res.send(content);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
 