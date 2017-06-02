import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from '../Header/Header';
import MeetingsList from './MeetingsList';

export default class Look extends Component {
  state = {
    scrolled: false,
    meetings: []
  }

  static contextTypes = {
    userId: PropTypes.string.isRequired
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
    const { roomId } = this.props.location;
    const { userId } = this.context;

    const baseUrl = 'http://localhost:8008/api/meetings';
    const queryUrl = roomId ? `room/${roomId}` : `user/${userId}`;

    axios.get(`${baseUrl}/${queryUrl}`)
         .then(res => this.setState({ meetings: res.data }));

  }

  componentWillUnmount = () => { window.removeEventListener('scroll', this.handleScroll); }

  handleScroll = (event) => {
    let top = event.srcElement.body.scrollTop;

    //room-photo height (200px) - header (50px)
    if(top > 150) { if(!this.state.scrolled) this.setState({scrolled: true}); }
    else { if(this.state.scrolled) this.setState({scrolled: false}); }

  }

  toggleMeetingStatus = (e) => {
    e.preventDefault();
  }

  render() {

    return (
      <div class={`wrap ${this.state.scrolled ? 'scrolled' : ''}`}>
        <Header />

        <div class='room-photo'></div>

        <div class='timeline'>
          <div class='timeline-header'>
            <div class='container'>

              <h3 class='title'>All meetings</h3>
              <p>February 29th</p>

            </div>
          </div>

          <MeetingsList
            meetings={this.state.meetings}
            toggleMeetingStatus={this.toggleMeetingStatus}
            />

        </div>
      </div>
    );
  }
}
