import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div class='pick'>
    <Link id='look' to="/look">
      <span class='text'>
        <span class='heading'>LOOK</span>
        <span>Scroll through the upcoming events</span>
        <i class='icon'></i>
      </span>
    </Link>
    <Link id='book' to="/book">
      <span class='text'>
        <span class='heading'>BOOK</span>
        <span>Browse through a list of rooms</span>
        <i class='icon'></i>
      </span>
    </Link>
  </div>
);
