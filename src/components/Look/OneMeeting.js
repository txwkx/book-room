import React from 'react';
import PropTypes from 'prop-types';

const OneMeeting = ({roomName, title, host, timeStart, timeEnd, status, toggleMeetingStatus}) => (

  <div class={`meeting ${status ? 'occupied' : 'available'}`}>
    <p>{roomName}
      <span class='time'>{timeStart} - {timeEnd}</span>
    </p>
    <h4 class='title'>{title}</h4>
    <p class='author'>
      <span>Host: </span>{host}
      </p>
    {!isHost && (<a class='attend' onClick={() => toggleMeetingStatus(id)}>{status ? 'Cancel' : 'Attend'}</a>)}
  </div>

);

OneMeeting.propTypes = {
  roomName: PropTypes.string,
  title: PropTypes.string,
  host: PropTypes.string,
  time: PropTypes.string,
  status: PropTypes.bool,
  toggleMeetingStatus: PropTypes.func
};

export default OneMeeting;
