import React, { Component } from 'react';
import { withAuth } from '../../context/authContext';
import './Signup.css';

class Signup extends Component {
  state = {
    username: '',
    password: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onSignup } = this.props;

    if (username !== '' && password !== '') {
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
          <h1>O Sole Mio</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            <div className='Signup-Signup-Login'>
              <input className='Signup-Signup-button' type='submit' value='SIGNUP' />
              <input className='Signup-Login-button' type='submit' value='LOGIN' onClick={this.goToLogin}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);