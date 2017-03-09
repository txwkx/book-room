import React, { Component, PropTypes } from 'react';

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

    /*const ddList = this.props.ddList.map(el => {
      return <li
                key={el.id}
                onClick={this.assignValue(el.value)}>
                <a>{el.name}</a>
              </li>
    });*/


    return(
      <div class='form-group'>
        <label class=''>
          <span class='label-text'>{this.props.name}</span>
        </label>
        <div class={`filter dropdown ${this.state.isOpened ? 'open' : ''}`}>
          <button
            class='btn btn-default dropdown-toggle'
            type='button'
            onClick={this.open}>
            {this.props.value} <span class='caret'></span>
          </button>
          <ul class='dropdown-menu'>

          </ul>
        </div>
      </div>
    );
  }
}

window.addEventListener('click', e => ddInstances.forEach(dd => dd.close()), false);
