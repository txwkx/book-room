import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './pages/Layout';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Look from './components/Look/Look';
import Pick from './components/Pick/Pick';

import './main.scss';

const root = (
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Pick}></IndexRoute>
      <Route path='login' name='login' component={Login}></Route>
      <Route path='book' name='book' component={Book}></Route>
      <Route path='look' name='look' component={Look}></Route>
    </Route>
  </Router>
);

const app = document.getElementById('app');

ReactDOM.render(root, app);
