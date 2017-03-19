import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from './Layout';

import './main.scss';

const root = (
  <Router>
    <Route path='/' component={Layout}></Route>
  </Router>
);

const app = document.getElementById('app');

ReactDOM.render(root, app);
