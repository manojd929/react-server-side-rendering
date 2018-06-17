// import React from 'react';
// import { Route } from 'react-router-dom';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import AdminsListPage from './pages/AdminsListPage';

export default [
  {
    ...App,
    routes: [
      {
        path: '/',
        exact: true,
        ...HomePage,
      },
      {
        path: '/users',
        ...UsersListPage,
      },
      {
        path: '/admins',
        ...AdminsListPage,
      },
      {
        path: '',
        ...NotFoundPage,
      },
    ],
  },
];


/*
export default () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={UsersList} />
    </div>
  );
}
*/