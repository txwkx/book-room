import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import Book from './components/Book/Book';
import Login from './components/Forms/Login';
import Look from './components/Look/Look';
import Pick from './components/Pick/Pick';
import FoF from './components/404';

const Layout = ({ }) => (
  <Switch>
    <Route exact path="/" component={Pick} />
    <Route path="/login" component={Login} />
    <Route path="/book" component={Book} />
    <Route path="/look" component={Look} />
    <Route component={FoF} />
  </Switch>
);

export default Layout;
