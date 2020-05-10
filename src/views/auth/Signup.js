import React, { Component } from 'react';
import { withAuth } from '../../context/authContext';
import './Signup.css';
import { Link } from 'react-router-dom';

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

  render() {
    const { username, password } = this.state;

    return (
      <div className='Signup'>
        <img className='Signup-logo' src='images/sun.png' alt='sun logo' />
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
          <input type="submit" value="SIGNUP" />
        </form>
        <p>Already have an account? <Link className='Signup-Link' to={'/'}>Login here</Link></p>
      </div>
    );
  }
}

export default withAuth(Signup);