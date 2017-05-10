import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import FormInput from './FormInput';
import FormDropdown from './FormDropdown';

export default class BookForm extends Component {
  static propTypes = {
      isOpened: PropTypes.bool.isRequired,
      closeBookForm: PropTypes.func.isRequired
  }

  state = {
    rooms: []
  }

  componentWillMount() {
    axios.get('http://localhost:8008/api/rooms')
      .then(res => this.setState({ rooms: res.data }));
  };

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.isOpened) this.FormInput.focus();
  }

  handleReservation = (e) => {
    e.preventDefault();
  }

  close = () => {
    this.props.closeBookForm();
  }

  onInputChange = (item, value) => {
    this.setState({ [item.term]: value});
    this.props.onChange(item.term, value);
  }

  render() {
    const { selectedDay, rooms } = this.state;
    const { isOpened, room } = this.props;

    return (
      <div class={`bookform ${isOpened ? 'opened' : ''}`}>
        <div class='modal-backdrop' onClick={this.close}></div>
        <div class='popup'>
          <div class='header'>Schedule meeting</div>
          <div class='content'>
            <form action='#' id='book-form'>

                <FormInput
                  type='text'
                  name='title'
                  ref={comp => {this.FormInput = comp;}}
                  />

                <FormDropdown
                  name='room'
                  value={`${room}`}
                  ddList={this.state.rooms}
                  onChange={this.onRoomChange}
                  />


                <input
                  type='submit'
                  value='Claim Room'
                  class='btn'
                  onClick={this.handleReservation}
                  />

            </form>
          </div>
        </div>
      </div>
    );
  }

}
