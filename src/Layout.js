import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import Book from './components/Book/Book';
import Login from './components/Forms/Login';
import Look from './components/Look/Look';
import Pick from './components/Pick/Pick';

const Layout = ({ }) => {
  return (
    <div>
      <Route exact path="/" component={Pick} />
      <Route path="/login" component={Login} />
      <Route path="/book" component={Book} />
      <Route path="/look" component={Look} />
    </div>
  );
}

export default Layout;
