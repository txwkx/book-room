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
    activeRoom: { id: '', name: '' },
    rooms: []
   }

  componentWillMount() {
    axios.get('/api/rooms')
      .then(res => this.setState({ rooms: res.data }));
  }

  toggleBookForm = (roomId, roomName) => {
    let room = {};
    room['id'] = roomId || '';
    room['name'] = roomName || '';  

    this.setState({
      formIsOpened: !this.state.formIsOpened,
      activeRoom: room
    });

  }

  applyFilter = (filter) => {
    if(filter !== this.state.activeFilter) this.setState({activeFilter: filter});
  }

  render() {
    const filters = <Filters filterslist={filters} applyFilter={this.applyFilter} />;

    return (
      <div class='book'>
        <Header openBookForm={this.toggleBookForm} />

        <div class="container-fluid content">



          <div class="row room-list">

            { this.state.rooms.map((el, i) => {
              return <OneRoom
                      key={`room-${i}`}
                      room={el.value}
                      roomId={el._id}
                      meeting={el.title}
                      callBookForm={() => this.toggleBookForm(el._id, el.value)}
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
