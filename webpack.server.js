const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack that we are building a bundle for node js , rather than for browser
  target: 'node',

  // Tell webpack the root file or entrypoint of our server application
  entry: './src/index.js',

  // Tell webpack where to put the output file that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // anything inside node_modules will not be included in the bundle - change in bundle size drastically
  // we do not ship the server bundle anywhere, hence
  externals: [webpackNodeExternals()],
};

module.exports = merge(baseConfig, config);
