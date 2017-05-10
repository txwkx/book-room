import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import axios from 'axios';

import styles from 'react-day-picker/lib/style.css';

import FormInput from './FormInput';
import FormDropdown from './FormDropdown';

export default class BookForm extends Component {
  static propTypes = {
      isOpened: PropTypes.bool.isRequired,
      closeBookForm: PropTypes.func.isRequired
  }

  state = {
    selectedDay: new Date(), // We set the selected default as today
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

  onRoomChange = (room) => {
    this.props.onChange(room);
  }

  handleDayClick = (day, { disabled, selected }) => {
    if (disabled) {
      return;
    }
    this.setState({
      selectedDay: selected ? undefined : day,
    });
  };

  render() {
    const { selectedDay, rooms } = this.state;
    const { isOpened, room } = this.props;
    const today = new Date();

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

                <DayPicker
                  selectedDays={selectedDay}
                  disabledDays={{ before: today }}
                  fromMonth={new Date()}
                  onDayClick={ this.handleDayClick }
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
