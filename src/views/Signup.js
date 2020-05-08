import React, { Component } from 'react';
import { withAuth } from '../context/authContext';

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
      <div>
        <div>
          <h1>Signup</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={this.handleChange}
            />
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);