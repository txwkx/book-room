import React, { Component } from 'react';

import Header from '../Header/Header';
import OneRoom from './OneRoom';
import BookForm from '../Forms/BookForm';
import Filters from './Filters';

const filters = [
  { value: 'Name', id: 1 },
  { value: 'Size', id: 2 },
  { value: 'Availability', id: 3 },
  { value: 'Status', id: 4 }
];

export default class Book extends Component {
  state = {
    formIsOpened: false,
    activeFilter: ''
   }

  toggleBookForm = () => {
    this.setState({formIsOpened: !this.state.formIsOpened});
  }

  applyFilter = (filter) => {
    console.log(filter);
    if(filter !== this.state.activeFilter) this.setState({activeFilter: filter});
  }

  render() {

    return (
      <div class='book'>
        <Header openBookForm={this.toggleBookForm} />

        <div class="container-fluid content">

          <Filters
            filterslist={filters}
            applyFilter={this.applyFilter}
          />

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
          closeBookForm={this.toggleBookForm}
        />
      </div>
    );
  }
}
