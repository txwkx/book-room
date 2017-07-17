import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from '../Header/Header';
import MeetingsList from './MeetingsList';
import BookForm from '../Forms/BookForm';

export default class Look extends Component {
  state = {
    scrolled: false,
    formIsOpened: false
  }

  componentDidMount = () => {
    this.fetchMeetingsList();
    window.addEventListener('scroll', this.handleScroll);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if((this.props.match.path !== nextProps.match.path)
      || (JSON.stringify(this.state.meetings) !== JSON.stringify(nextState.meetings))
      || (this.state.scrolled !== nextState.scrolled)
      || (this.state.formIsOpened !== nextState.formIsOpened)
    ) {
      return true;
    }

    return false;
  }
  componentDidUpdate = () => { this.fetchMeetingsList(); }

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

    axios.post('/api/meetings/status', meetingsData)
      .then(res => {
        this.fetchMeetingsList();
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleBookForm = (roomId, roomName) => {
    this.setState({formIsOpened: !this.state.formIsOpened});
  }


  fetchMeetingsList = () => {
    const roomId = this.props.match.params.id;
    const { userId } = this.context;

    const baseUrl = '/api/meetings';
    const queryUrl = roomId ? `room/${roomId}` : `user/${userId}`;

    axios.get(`${baseUrl}/${queryUrl}`)
         .then(res => this.setState({ meetings: res.data }));
  }

  render() {
    const roomId = this.props.match.params.id;

    return (
    <div class='look'>
      <div class={`wrap ${this.state.scrolled ? 'scrolled' : ''}`}>
        <Header openBookForm={this.toggleBookForm} />

        <div class='room-photo'></div>

        <div class='timeline'>
          <div class='timeline-header'>
            <div class='container'>

              {roomId ?
              <h3 class='title'>Room Schedule</h3> :
              <h3 class='title'>Personal Schedule</h3>
              }

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
        />
      </div>
    );
  }
}
