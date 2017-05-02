import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

import OneMeeting from './OneMeeting';

export default class MeetingsList extends Component {
  state = {
    _roomId: '5908587aabe7f32113cc6b88',
    meetings: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8008/api/meetings/room/${this.state._roomId}`)
      .then(res => this.setState({ meetings: res.data }));
  }

  render(){
    const attending = true;

    return(
      <div class='timeline-body'>
        <div class='container'>

          {
            this.state.meetings.map((el, i) => {
              return <div key={`section-${i}`}>
                <div class='date text-center'>
                  <p>{moment(el.startTime).format('MMMM Do')}</p>
                </div>
                <OneMeeting
                      key={`meeting-${i}`}
                      roomName={el.roomId.name}
                      title={el.title}
                      host={el.hostId.name}
                      timeStart={moment(el.startTime).format('HH:mm')}
                      timeEnd={moment(el.endTime).format('HH:mm')}
                      status={attending}
                      toggleMeetingStatus={this.props.toggleMeetingStatus}
                      />
            </div>;
            })
          }



          <OneMeeting
              roomName={'Room #5'}
              title={'True meeting'}
              host={'Name Surname'}
              timeStart={'19:00'}
              timeEnd={'23:00'}
              status={false}
              toggleMeetingStatus={this.props.toggleMeetingStatus}
              />

        </div>
      </div>
    );
  }
}

MeetingsList.propTypes = {
  toggleMeetingStatus: PropTypes.func
};
