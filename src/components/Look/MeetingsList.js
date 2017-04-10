import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OneMeeting from './OneMeeting';

export default class MeetingsList extends Component {

  render(){

    return(
      <div class='timeline-body'>
        <div class='container'>

          <OneMeeting
              roomName={'Meeting Hall #1'}
              title={'Small Talk'}
              host={'Major'}
              timeStart={'9:00'}
              timeEnd={'10:00'}
              status={true}
              toggleMeetingStatus={this.props.toggleMeetingStatus}
              />

          <div class='date text-center'>
            <p>31 February</p>
          </div>

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
