import React from 'react';
import { Link } from 'react-router-dom';

require('./header.scss');

const Header = () => (
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class='book-btn'>
        <button class='btn btn-danger'>BOOK</button>
      </div>
      <div class="navbar-header">
        <Link class="navbar-brand" to="/">LOGO</Link>
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
          <li class="active"><Link to="/book">Book</Link></li>
          <li><Link to="/look">Look</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
