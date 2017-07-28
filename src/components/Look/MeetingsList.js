import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import OneMeeting from './OneMeeting';

export default class MeetingsList extends Component {

  render(){

    return(
      <div class='timeline-body'>
        <div class='container'>

          {
            this.props.meetings.map((el, i) => {
              return <div key={`section-${i}`}>
                <div class='date text-center'>
                  <p>{moment(el.startTime).format('MMMM Do')}</p>
                </div>
                <OneMeeting
                      key={`meeting-${i}`}
                      id={el._id}
                      roomId={el.room._id}
                      roomName={el.room.value}
                      title={el.title}
                      host={el.hostId.username}
                      timeStart={moment(el.startTime).format('HH:mm')}
                      timeEnd={moment(el.endTime).format('HH:mm')}
                      status={el.status}
                      isHost={el.isHost}
                      toggleMeetingStatus={this.props.toggleMeetingStatus}
                      />
            </div>;
            })
          }

        </div>
      </div>
    );
  }
}

MeetingsList.propTypes = {
  toggleMeetingStatus: PropTypes.func
};
