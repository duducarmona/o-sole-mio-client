import React, { Component } from 'react';
import { withAuth } from '../../context/authContext';
import './Signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Signup extends Component {
  state = {
    username: '',
    password: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onSignup } = this.props;
    
    if (!username || username.trim() === '') {
      toast.info('Please, insert the Username');
      this.usernameInput.value = '';
      this.usernameInput.focus();
    } 
    else if (!password || password.trim() === '') {
      toast.info('Please, insert the Password');
      this.passwordInput.value = '';
      this.passwordInput.focus();
    }
    else {
      onSignup({ username, password });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  goToLogin = () => {
    const { history } = this.props;

    history.push('/');
  }
  
  render() {
    const { username, password } = this.state;

    return (
      <div className='Signup-background-image'>
        <div className='Signup'>
          <ToastContainer className='ToastContainer'
            position='bottom-center'
            type='info'>
          </ToastContainer>
          <h1 className='App-h1-login-signup'>O Sole Mio</h1>
          <form onSubmit={this.handleSubmit}>
            <input className='App-login-signup-textbox'
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
              ref={(input) => { this.usernameInput = input; }}
            />
            <input className='App-login-signup-textbox'
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              ref={(input) => { this.passwordInput = input; }}
            />
            <div className='Signup-Signup-Login'>
              <input className='Signup-Signup-button App-login-signup-submit' type='submit' value='SIGNUP' />
              <input className='Signup-Login-button App-login-signup-submit' type='submit' value='LOGIN' onClick={this.goToLogin}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);