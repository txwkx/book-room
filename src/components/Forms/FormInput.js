import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormInput extends Component {
    state = { isActive: false }

    static propTypes = {
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        onChange: PropTypes.func
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

    render() {
        return (
            <div class={`form-group textinput ${this.state.isActive ? 'active': ''}`}>
                <label class='label-control'>
                    <span class='label-text'>{this.props.name}</span>
                </label>
                <input type={this.props.type}
                       name={this.props.name}
                       class='form-control'
                       ref={el => {this.el = el;}}
                       onFocus={this.onFocusBlur}
                       onBlur={this.onFocusBlur}
                       onChange={this.props.onChange} />
            </div>
        );
    }
}
