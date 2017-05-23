import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

const ddInstances = [];

export default class FormDropdown extends Component {
  state = { isOpened: false }

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
    up: PropTypes.bool,
    ddList: PropTypes.array,
    onChange: PropTypes.func
  }

  static defaultProps = {
    isHidden: false
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

  assignValue = (id=0, val) => {
    if(val != this.props.value){
      this.props.onChange(id, val);
    }
    this.close();
  }

  render() {
    const { name, isHidden, value, ddList, up } = this.props;
    const { isOpened } = this.state;

    return(
      <div class={`form-group ${isHidden ? 'hidden' : ''}`}>
        <label class=''>
          <span class='label-text'>{name}</span>
        </label>
        <div class={`filter dropdown ${isOpened ? 'open' : ''} ${up ? 'dropup' : ''}`}>
          <button
            class='btn btn-default dropdown-toggle'
            type='button'
            onClick={this.open}>
            {value} <span class='caret'></span>
          </button>
          <ul class='dropdown-menu'>
            { ddList.map(el => (
                      <li
                        key={shortid.generate()}
                        onClick={() => this.assignValue(el._id, el.value)}>
                        <a>{el.value}</a>
                      </li>
            )) }
          </ul>
        </div>
      </div>
    );
  }
}

window.addEventListener('click', e => ddInstances.forEach(dd => dd.close()), false);
