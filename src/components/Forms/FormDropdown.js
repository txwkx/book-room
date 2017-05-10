import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ddInstances = [];

export default class FormDropdown extends Component {
  state = { isOpened: false }

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    ddList: PropTypes.array,
    onChange: PropTypes.func
  }

  componentDidMount = () => {
    ddInstances.push(this);
  }

  componentWillUnmount = () => {
    ddInstances.splice(ddInstances.indexOf(this), 1);
  }

  open = (e) => {
    e.stopPropagation();
    this.setState({isOpened: !this.state.isOpened});
    ddInstances.filter(dd => dd != this).forEach(dd => dd.close());
  }

  close = () => {
    this.setState({isOpened: false});
  }

  assignValue = (val) => {
    if(val != this.props.value){
      this.props.onChange(val);
    }
    this.close();
  }

  render() {
    const { name, value, ddList } = this.props;
    const { isOpened } = this.state;

    return(
      <div class='form-group'>
        <label class=''>
          <span class='label-text'>{name}</span>
        </label>
        <div class={`filter dropdown ${isOpened ? 'open' : ''}`}>
          <button
            class='btn btn-default dropdown-toggle'
            type='button'
            onClick={this.open}>
            {value || 'Select Room'} <span class='caret'></span>
          </button>
          <ul class='dropdown-menu'>
            { ddList.map(el => (
                      <li
                        key={el._id}
                        onClick={() => this.assignValue(el.name)}>
                        <a>{el.name}</a>
                      </li>
            )) }
          </ul>
        </div>
      </div>
    );
  }
}

window.addEventListener('click', e => ddInstances.forEach(dd => dd.close()), false);
