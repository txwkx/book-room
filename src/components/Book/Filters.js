import React, { Component } from 'react';

export default class Filters extends Component {

  applyFilter = (e, val) => {
    e.preventDefault();
    this.props.applyFilter(val);
  }

  render() {
    const list = this.props.filterslist.map(filter => {
      return <li key={filter.id}
                 onClick={e => this.applyFilter(e, filter.value)}>
                <a href="#">{filter.value}</a>
             </li>;
    });

    return (
      <div class="row filters">
        <ul>
          {list}
        </ul>
      </div>
    );
  }

}
