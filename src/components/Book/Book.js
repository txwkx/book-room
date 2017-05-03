import React, { Component } from 'react';
import axios from 'axios';

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
    activeFilter: '',
    activeRoom: '',
    rooms: []
   }

  componentDidMount() {
    axios.get('http://localhost:8008/api/rooms')
      .then(res => this.setState({ rooms: res.data }));
  }

  toggleBookForm = (room) => {
    room = room || '';
    this.setState({activeRoom: room});
    this.setState({formIsOpened: !this.state.formIsOpened});
  }

  applyFilter = (filter) => {
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

            { this.state.rooms.map((el, i) => {
              return <OneRoom
                      key={`room-${i}`}
                      room={el.name}
                      roomId={el._id}
                      meeting={el.title}
                      callBookForm={() => this.toggleBookForm(el.name)}
                    />;
            })}

          </div>
        </div>

        <BookForm
          isOpened={this.state.formIsOpened}
          closeBookForm={this.toggleBookForm}
          room={this.state.activeRoom}
        />
      </div>
    );
  }
}
