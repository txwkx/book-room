import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div class='pick'>
    <Link id='look' to="/look">
      <span class='text'>
        <span class='heading'>LOOK</span>
        <span>Upcoming Events</span>
        <i class='icon'></i>
      </span>
    </Link>
    <Link id='book' to="/book">
      <span class='text'>
        <span class='heading'>BOOK</span>
        <span>List of Rooms</span>
        <i class='icon'></i>
      </span>
    </Link>
  </div>
);
