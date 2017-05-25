import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import axios from 'axios';
import moment from 'moment';

import styles from 'react-day-picker/lib/style.css';

import FormInput from './FormInput';
import FormDropdown from './FormDropdown';

let INTERVALS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
  '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
];

export default class BookForm extends Component {
  static propTypes = {
      isOpened: PropTypes.bool.isRequired,
      closeBookForm: PropTypes.func.isRequired
  }

  state = {
    title: '',
    rooms: [],
    selectedDay: new Date(),
    today: new Date(),
    startT: '',
    endT: '',
    hideTime: true,
    endArr: INTERVALS,
    success: false
  }

  initState = {}
  /* LIFECYCLE METHODS */

  componentWillMount = () => {
    axios.get('http://localhost:8008/api/rooms')
      .then(res => this.setState({ rooms: res.data }, () => {
        this.initState = this.state;
      }));
  };

  componentDidUpdate = (prevProps, prevState) => {
    if(!prevProps.isOpened) this.FormInput.focus();
  }

  /* INPUT CHANGES */

  onTitleChange = title => {
    this.setState({ title });
  }

  onRoomChange = (roomId, roomName) => {
    this.props.onChange(roomId, roomName);
    this.updateTimeSlots(roomId);
  }

  onDayChange = (day, { disabled }) => {
    if (disabled) { return; }
    this.setState({ selectedDay: day }, () => {
      this.updateTimeSlots();
    });
  };

  onStartTChange = (id, time) => {
    const time_pos = INTERVALS.indexOf(time);
    const end_time = INTERVALS.filter(el => INTERVALS.indexOf(el) > time_pos);

    this.setState({ startT: time, endT: INTERVALS[time_pos+1], endArr: end_time });
  }

  onEndTChange = (id, time) => {
    this.setState({ endT: time });
  }

  updateTimeSlots = (roomId) => {
    const date = this.state.selectedDay;
    const room = roomId || this.props.room.id;
    if(date && room){
      this.setState({ hideTime: false });
    } else {
      console.log('Trigger error');
    }
  }

  mapTime2Obj = (timeArr) => {
    return timeArr.map(el => ({ value: el }));
  }

  close = () => {
    this.props.closeBookForm();
    this.setState(this.initState);
  }

  /* HANDLE RESERVATION */

  handleReservation = (e) => {
    e.preventDefault();
    const room = this.props.room.id;
    const { selectedDay, startT, endT, title } = this.state;

    const day = selectedDay.toISOString().split('T')[0];
    const startTime = new Date(`${day}T${startT}`).toISOString();
    const endTime = new Date(`${day}T${endT}`).toISOString();
    //toISO ignores timezone

    const newMeeting = {
      room: room,
      title: title,
      startT: startTime,
      endT: endTime
    };

    axios.post('http://localhost:8008/api/meetings', newMeeting)
      .then(res => {
        this.setState({ success: true });
        setTimeout(this.close, 1200);
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  render() {
    // console.log('Book form rendered');
    const { title, selectedDay, today, rooms, startT, endT, hideTime, endArr, success } = this.state;
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
                  name='Title'
                  value={title}
                  ref={comp => {this.FormInput = comp;}}
                  onChange={ this.onTitleChange }
                  />

                <FormDropdown
                  name='Room'
                  value={`${room.name}` || 'Select Room'}
                  ddList={this.state.rooms}
                  onChange={ this.onRoomChange }
                  />

                <DayPicker
                  selectedDays={selectedDay}
                  disabledDays={{ before: today }}
                  fromMonth={new Date()}
                  onDayClick={ this.onDayChange }
                  />

               <FormDropdown
                 name='Start Time'
                 value={`${startT}` || 'HH:MM'}
                 isHidden={hideTime}
                 up={true}
                 ddList={this.mapTime2Obj([...INTERVALS.slice(0, -1)])}
                 onChange={ this.onStartTChange }
                 />

               <FormDropdown
                 name='End Time'
                 value={`${endT}` || 'HH:MM'}
                 isHidden={hideTime}
                 up={true}
                 ddList={this.mapTime2Obj(endArr)}
                 onChange={ this.onEndTChange }
                 />

               {success ?
                 <input type='submit' value='DONE' class='btn success' />
                :
                 <input type='submit' value='Claim Room' class='btn' onClick={this.handleReservation}/>
                }


            </form>
          </div>
        </div>
      </div>
    );
  }

}
