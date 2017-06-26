import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from '../Header/Header';
import MeetingsList from './MeetingsList';
import BookForm from '../Forms/BookForm';

export default class Look extends Component {
  state = {
    scrolled: false,
    meetings: [],
    formIsOpened: false,
    activeRoom: { id: '', name: '' }
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

  toggleMeetingStatus = (meetingId) => {
    const meetingsData = {
      meetingId: meetingId,
      userId: this.context.userId,
    };

    axios.post('http://localhost:8008/api/meetings/status', meetingsData)
      .then(res => {
        this.fetchMeetingsList();
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleBookForm = (roomId, roomName) => {
    this.setState({formIsOpened: !this.state.formIsOpened});
    this.toggleActiveRoom(roomId, roomName);
  }

  render() {
    const { roomId } = this.props.location;

    return (
    <div class='look'>
      <div class={`wrap ${this.state.scrolled ? 'scrolled' : ''}`}>
        <Header openBookForm={this.toggleBookForm} />

        <div class='room-photo'></div>

        <div class='timeline'>
          <div class='timeline-header'>
            <div class='container'>

              <h3 class='title'>All meetings</h3>
              {roomId && <p>{this.props.location.roomId}</p>}

            </div>
          </div>

          {this.state.meetings &&
            <MeetingsList
              meetings={this.state.meetings}
              toggleMeetingStatus={this.toggleMeetingStatus}
              />
          }

          </div>
        </div>

        <BookForm
          isOpened={this.state.formIsOpened}
          closeBookForm={this.toggleBookForm}
          room={this.state.activeRoom}
          onChange={this.toggleActiveRoom}
        />
      </div>
    );
  }
}
