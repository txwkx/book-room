import React from 'react';
import PropTypes from 'prop-types';

const OneRoom = ({ name, title, callBookForm }) => (
  <div class='col-md-3 col-sm-4 text-center'>
    <div class='room'>
      <div class='header'>
        <span>{name}</span>
      </div>
      <div class='info'>
        <p class='title'>{title}</p>
        <button
          class='btn btn-success btn-block'
          onClick={callBookForm}>
          BOOK
        </button>
      </div>
    </div>
  </div>
);

OneRoom.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  callBookForm: PropTypes.func
};

export default OneRoom;
