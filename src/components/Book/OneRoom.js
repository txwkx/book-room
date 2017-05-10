import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const OneRoom = ({ meeting, room, roomId, callBookForm }) => (
  <div class='col-md-3 col-sm-4 text-center'>
    <div class='room'>
      <Link class='header' to={{pathname: `/look/${roomId}`, roomId: roomId }}>
        <span>{meeting}</span>
      </Link>
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
  roomId: PropTypes.string.isRequired,
  callBookForm: PropTypes.func
};

export default OneRoom;
