import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import axios from 'axios';
import moment from 'moment';

import styles from 'react-day-picker/lib/style.css';

import FormInput from './FormInput';
import FormDropdown from './FormDropdown';
import Success from './Success';

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
    startT: '',
    endT: '',
    endArr: INTERVALS,
    formStatus: '',
    success: false,
    activeRoom: { id: '', name: '' }
  }

  initState = {}
  /* LIFECYCLE METHODS */

  componentWillMount = () => {
    axios.get('/api/rooms')
      .then(res => this.setState({ rooms: res.data }, () => {
        this.initState = this.state;
      }));
  };

  componentDidUpdate = (prevProps, prevState) => {
    if(!prevProps.isOpened) this.FormInput.focus();
  }

  /* INPUT CHANGES */

  onTitleChange = title => {
    this.setState({ title: title, formStatus: '' });
  }

  onRoomChange = (roomId, roomName) => {
    let room = {};
    room['id'] = roomId || '';
    room['name'] = roomName || '';
    this.setState({activeRoom: room});
  }

  onDayChange = (day, { disabled }) => {
    if (disabled) { return; }
    this.setState({ selectedDay: day });
  };

  onStartTChange = (id, time) => {
    const time_pos = INTERVALS.indexOf(time);
    const end_time = INTERVALS.filter(el => INTERVALS.indexOf(el) > time_pos);

    this.setState({ startT: time, endT: INTERVALS[time_pos+1], endArr: end_time });
  }

  onEndTChange = (id, time) => {
    this.setState({ endT: time });
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
    const { selectedDay, activeRoom, startT, endT, title } = this.state;

    const day = selectedDay.toISOString().split('T')[0];
    const startTime = new Date(`${day}T${startT}`).toISOString();
    const endTime = new Date(`${day}T${endT}`).toISOString();
    //toISO ignores timezone

    const newMeeting = {
      room: activeRoom.id,
      title: title,
      startT: startTime,
      endT: endTime
    };

    axios.post('/api/meetings', newMeeting)
      .then(res => {
        this.setState({ success: true });
        setTimeout(this.close, 1500);
      })
      .catch(err => {
        this.setState({ formStatus: 'error' });
      });
  }

  render() {
    const { title, selectedDay, activeRoom, rooms, startT, endT, endArr, formStatus, success } = this.state;
    const { isOpened } = this.props;

    return (
      <div class={`bookform ${isOpened ? 'opened' : ''}`}>
        <div class='modal-backdrop' onClick={this.close}></div>
        <div class='popup'>
          <div class='header'>
            Schedule meeting
            <a href='#' class='close' onClick={this.close}></a>
          </div>
          <div class='content'>
            { success ?
            <Success /> :
            <form action='#' id='book-form' class={formStatus}>

                <FormInput
                  name='Title'
                  value={title}
                  ref={comp => {this.FormInput = comp;}}
                  onChange={ this.onTitleChange }
                  />

                <div class='inputs-group'>
                  <FormDropdown
                    name='Location'
                    value={`${activeRoom.name}` || 'Room'}
                    ddList={this.state.rooms}
                    onChange={ this.onRoomChange }
                    />

                    <FormDropdown
                     name='Start Time'
                     value={`${startT}` || 'HH:MM'}
                     disabled={!Boolean(activeRoom.id && selectedDay)}
                     ddList={this.mapTime2Obj([...INTERVALS.slice(0, -1)])}
                     onChange={ this.onStartTChange }
                     />

                   <FormDropdown
                     name='End Time'
                     value={`${endT}` || 'HH:MM'}
                     disabled={!Boolean(activeRoom.id && selectedDay)}
                     ddList={this.mapTime2Obj(endArr)}
                     onChange={ this.onEndTChange }
                     />
               </div>

                   <DayPicker
                     selectedDays={selectedDay}
                     disabledDays={{ before: new Date() }}
                     firstDayOfWeek={ 1 }
                     fromMonth={new Date()}
                     onDayClick={ this.onDayChange }
                     />

                 <input type='submit' value='Claim Room' disabled={!(title && activeRoom && startT && endT)} class='btn btn-form' onClick={this.handleReservation}/>

            </form>
          }
          </div>
        </div>
      </div>
    );
  }

}
