import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import './Login.css';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onLogin } = this.props;

    if (username !== "" && password !== "") {
      onLogin({ username, password });
    }
  };

  cleanForm = () => {
    this.setState({
      username: "",
      password: "",
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className='Login'>
        <img className='Login-logo' src='images/sun.png' alt='sun logo' />
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
          <input type="submit" value="LOGIN" />
        </form>
        <p>Don't have an account? <Link className='Login-Link' to={'/signup'}>Register here</Link></p>
      </div>
    );
  }
}

export default withAuth(Login);
