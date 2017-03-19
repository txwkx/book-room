import React, { Component } from 'react';

import Header from '../Header/Header';
import MeetingsList from './MeetingsList';

require('./look.scss');

export default class Look extends Component {
  state = { scrolled: false }

  componentDidMount = () => { window.addEventListener('scroll', this.handleScroll); }

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
            toggleMeetingStatus={this.toggleMeetingStatus}
            />

        </div>
      </div>
    );
  }
}
