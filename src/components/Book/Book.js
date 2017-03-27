import React, { Component } from 'react';

import Header from '../Header/Header';
import OneRoom from './OneRoom';
import BookForm from '../Forms/BookForm';

export default class Book extends Component {
  state = { formIsOpened: false }

  toggleBookForm = () => {
    this.setState({formIsOpened: !this.state.formIsOpened});
  }

  render() {

    return (
      <div class='book'>
        <Header openBookForm={this.toggleBookForm} />

        <div class="container-fluid content">

          <div class="row filters">
            <ul>
              <li><a href="#">Name</a></li>
              <li><a href="#">Size</a></li>
              <li><a href="#">Availability</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>

          <div class="row room-list">

            <OneRoom
              name={'MEETING ROOM NUMBA 3'}
              title={'Long meeting title yeap'}
              callBookForm={this.callBookForm}
            />

          </div>
        </div>

        <BookForm
          isOpened={this.state.formIsOpened}
          closeBookForm={this.toggleBookForm} />
      </div>
    );
  }
}
