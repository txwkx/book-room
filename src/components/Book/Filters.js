import React, { Component } from 'react';

export default class Filters extends Component {

  applyFilter = (e, val) => {
    e.preventDefault();
    this.props.applyFilter(val);
  }

  render() {

    return (
      <div class="row filters">
        <ul>
          {this.props.filterslist.map((el, i) => (
                  <li key={`filter-${i}`}
                      onClick={e => this.applyFilter(e, el.value)}>
                      <a href="#">{el.value}</a>
                   </li>
          ))}
        </ul>
      </div>
    );
  }

}
