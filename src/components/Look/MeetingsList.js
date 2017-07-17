import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import OneMeeting from './OneMeeting';

export default class MeetingsList extends Component {

  render(){
    const { userId } = this.context;

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
                      roomId={el.roomId._id}
                      roomVal={el.roomId.value}
                      title={el.title}
                      host={el.hostId.name}
                      timeStart={moment(el.startTime).format('HH:mm')}
                      timeEnd={moment(el.endTime).format('HH:mm')}
                      status={el.attendees.filter(user => user._id === userId).length > 0}
                      isHost={el.hostId._id === userId}
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
