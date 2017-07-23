import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const OneRoom = ({ meeting, photo, name, roomId, callBookForm }) => (
  <div class='col-md-3 col-sm-4 text-center'>
    <div class='room'>
      <Link class='header' style={{backgroundImage: `url('${photo}')`}} to={`/look/${roomId}`}>
        <span>{meeting}</span>
      </Link>
      <div class='info'>
        <p class='title'>{name}</p>
        <button
          class='btn btn-green btn-block'
          onClick={callBookForm}>
          BOOK
        </button>
      </div>
    </div>
  </div>
);

OneRoom.propTypes = {
  meeting: PropTypes.string,
  name: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  callBookForm: PropTypes.func
};

export default OneRoom;
