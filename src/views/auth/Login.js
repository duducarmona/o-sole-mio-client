import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import './Login.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onLogin } = this.props;

    if (username !== '' && password !== '') {
      onLogin({ username, password });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  goToSubmit = () => {
    const { history } = this.props;

    history.push('/signup');
  }

  render() {
    const { username, password } = this.state;

    return (
      <div className='Login-background-image'>
        <div className='Login'>
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
            <div className='Login-Login-Signup'>
              <input className='Login-Login-button' type='submit' value='LOGIN' />
              <input className='Login-Signup-button' type='submit' value='SIGNUP' onClick={this.goToSubmit}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
