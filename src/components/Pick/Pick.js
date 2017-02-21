import React from 'react';

require('./pick.scss');

export default ({ }) => (
  <div class='pick'>
    <a href="#/look" id="look">
      <span class='text'>
        <span class='heading'>LOOK</span>
        <span>Scroll through the upcoming events</span>
        <i class='icon'></i>
      </span>
    </a>
    <a href="#/book" id='book'>
      <span class='text'>
        <span class='heading'>BOOK</span>
        <span>Browse through a list of rooms</span>
        <i class='icon'></i>
      </span>
    </a>
  </div>
);
