import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormInput from './FormInput';
import FormDropdown from './FormDropdown';

export default class BookForm extends Component {
  static propTypes = {
      isOpened: PropTypes.bool.isRequired,
      closeBookForm: PropTypes.func.isRequired
  }

  state = {}

  handleReservation = (e) => {
    e.preventDefault();
  }

  close = () => {
    this.props.closeBookForm();
  }

  onInputChange(item, value){
    this.setState({ [item.term]: value});
    this.props.onChange(item.term, value);
  }

  render() {

    return (
      <div class={`bookform ${this.props.isOpened ? 'opened' : ''}`}>
        <div class='modal-backdrop' onClick={this.close}></div>
        <div class='popup'>
          <div class='header'>Schedule meeting</div>
          <div class='content'>
            <form action='#' id='book-form'>

                <FormInput type='text' name='title' />

                <FormDropdown name='room' value={`${this.props.room}`} onChange={this.onInputChange} />

                <FormDropdown name='date' value='February 29' onChange={this.onInputChange} />

                <FormDropdown name='time' value='19:00' onChange={this.onInputChange} />

                <FormDropdown name='extend' value='30 min' onChange={this.onInputChange} />

                <input type='submit' value='Claim Room' class='btn'onClick={this.handleReservation} />

            </form>
          </div>
        </div>
      </div>
    );
  }

}
