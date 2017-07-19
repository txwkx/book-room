import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './header.scss';

const Header = ({ openBookForm }) => (
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class='book-btn'>
        <button class='btn btn-danger' onClick={e => openBookForm()}>BOOK</button>
      </div>
      <div class="navbar-header">
        <Link class="navbar-brand" to="/mode">LOGO</Link>
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
          <li><NavLink activeClassName="active" to="/look">Look</NavLink></li>
          <li><NavLink activeClassName="active" to="/book">Book</NavLink></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
