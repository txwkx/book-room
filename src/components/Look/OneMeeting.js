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
    { status ?
      <a class='attend' onClick={toggleMeetingStatus}>Cancel</a> :
      <a class='attend free' onClick={toggleMeetingStatus}>Attend</a>
    }
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
