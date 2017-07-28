import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormInput extends Component {
    state = { isActive: false }

    static propTypes = {
      name: PropTypes.string.isRequired,
      value: PropTypes.string,
      onChange: PropTypes.func
    }

    static defaultProps = {
      type: 'text'
    }

    onFocusBlur = (e) => {
      if (e.type === 'focus' || e.target.value.length > 0) {
          this.setState({isActive: true});
      } else {
          this.setState({isActive: false});
      }
    }

    focus = () => {
      this.el.focus();
    }

    assignValue = e => {
      this.props.onChange(e.target.value);
    }

    render() {
      const { name, required, type, value } = this.props;
      const { isActive } = this.state;

      return (
          <div class={`form-group textinput ${isActive ? 'active': ''}`}>
              <label class='label-control'>
                {required ?
                  <span class='label-text'>{name}<i>*</i></span>
                  :
                  <span class='label-text'>{name}</span>
                }
              </label>
              <input type={type}
                     name={name}
                     value={value}
                     class='form-control'
                     ref={el => {this.el = el;}}
                     onFocus={this.onFocusBlur}
                     onBlur={this.onFocusBlur}
                     onChange={this.assignValue} />
          </div>
      );
    }
}
