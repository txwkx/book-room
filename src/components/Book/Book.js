import React, { Component } from 'react';

import Header from '../Header/Header';
import OneRoom from './OneRoom';

require('./book.scss');

class Book extends Component {

  callBookForm(e){
    e.preventDefault();
  }

  render() {

    return (
      <div class='book'>
        <Header />

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
              callBookForm={this.callBookForm.bind(this)}
            />

          </div>
        </div>
      </div>
    );
  }
}

export default Book;
