import React from 'react';
import PropTypes from 'prop-types';

const OneRoom = ({ meeting, room, callBookForm }) => (
  <div class='col-md-3 col-sm-4 text-center'>
    <div class='room'>
      <div class='header'>
        <span>{meeting}</span>
      </div>
      <div class='info'>
        <p class='title'>{room}</p>
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
  meeting: PropTypes.string,
  room: PropTypes.string.isRequired,
  callBookForm: PropTypes.func
};

export default OneRoom;
