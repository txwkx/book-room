import React, { Component } from 'react';

import FormInput from './FormInput';

require('./login.scss');

export default class Login extends Component {
  state = {}

  handleLogin = (e) => {
    e.preventDefault()
  }

  recoverPassword = (e) => {
    e.preventDefault()
  }

  render() {
    return(
      <div class='login'>
        <div class="popup">
          <div class="header">Welcome Back</div>
          <div class="content">
            <form action="#" id="login-form">
              
              <FormInput type='text' name='username' />

              <FormInput type='password' name='password' />

              <input type="submit" value="Login" class="btn" onClick={this.handleLogin} />
              <p class='recover'><a href="#" onClick={this.recoverPassword}>Forgot password ?</a></p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
