import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Book from './components/Book/Book';
import Login from './components/Forms/Login';
import Signup from './components/Forms/Signup';
import Look from './components/Look/Look';
import Pick from './components/Pick/Pick';
import FoF from './components/404';

class Routes extends Component {

  static childContextTypes = {
     userId: PropTypes.string.isRequired
  }

  getChildContext = () => ({ userId: '59084dad7f34d201033dec32'})

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Pick} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/book" component={Book} />
        <Route path="/look" component={Look} />
        <Route component={FoF} />
      </Switch>
    );
  }

}

export default Routes;
