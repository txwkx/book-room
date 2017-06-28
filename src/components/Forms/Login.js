import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';

import FormInput from './FormInput';
import Success from './Success';

class Login extends Component {
  state = {
    success: false
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.setState({error: ''});

    const userData = {
      username: username,
      password: password
    };

    axios.post('http://localhost:8008/login', userData)
      .then(res => {
        const status = res.data.success;
        if(!status) {
          this.setState({error : res.data.message});
        } else {
          console.log('userID: ', res.data.userId);
          this.setState({success: true});
          setTimeout(() => {
              this.props.history.push('/');
          }, 1500);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  attrChangeUn = (username) => {
    this.setState({username});
  }

  attrChangePwd = (password) => {
    this.setState({password});
  }

  componentDidMount = () => {
    this.FormInput.focus();
  }

  render() {
    const { error, success, username, password } = this.state;
    return(
      <div class='login'>
        <div class='popup'>
          <div class='header'>Welcome Back</div>
          <div class='content'>
            { success ?
            <Success /> :
            <form action="http://localhost:8008/login" method="post" id='login-form'>

              <FormInput
                type='text'
                name='username'
                ref={comp => {this.FormInput = comp;}}
                onChange={ this.attrChangeUn }
                 />

              <FormInput
                type='password'
                name='password'
                onChange={ this.attrChangePwd }
                />

              <p class='error-msg'>{error}</p>

              <input
                type='submit'
                value='Login'
                class='btn btn-form'
                disabled={!(username && password)}
                onClick={this.handleLogin}
                />

              <p>Need an account? <Link to="/signup">Sign up</Link></p>
            </form>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
