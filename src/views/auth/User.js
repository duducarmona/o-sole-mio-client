import React, { Component } from "react";
import { withAuth } from '../../context/authContext';
import apiClient from '../../services/apiClient';
import './User.css';
import '../../App.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class User extends Component {
  state = {
    username: this.props.user.data.username,
    showPassword: false,
    currentPassword: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // const { history } = this.props;
    const {
      username,
      // currentPassword
    } = this.state;

    if (!username || username.trim() === '') {
      toast.error(`Username can't be empty`);
      this.usernameInput.focus();
    }
    else {
      apiClient
        .editUser(this.props.match.params.id, {
          username
        })
        .then((res) => {
          toast.success('User modified');
        })
        .catch((error) => {
          if (error.response.status === 422) {
            toast.error('Username already exist');
            this.usernameInput.focus();
          }
          else {
            const { history } = this.props;
            history.push('/notFoundPage');
          }
        });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  changePasswordVisibility = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  render() {
    const { 
      username, 
      showPassword,
      currentPassword
    } = this.state;

    const { onLogout } = this.props;

    return (
      <div className='User App-with-padding'>
        <ToastContainer className='ToastContainer'
          position='bottom-center'
          type='info'>
        </ToastContainer>
        <h1 className='view-h1'>My account</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input 
            type='text'
            name='username'
            id='username'
            onChange={this.handleChange}
            value={username}
            ref={(input) => { this.usernameInput = input; }}
          />
          <div>
            {
              showPassword && 
              <div className='User-password-group'>
                <label htmlFor='currentPassword'>Current password</label>
                <input 
                  type='password'
                  name='currentPassword'
                  id='currentPassword'
                  onChange={this.handleChange}
                  value={currentPassword}
                  placeholder='●●●●●●●●●●'
                />
                <label htmlFor='newPassword'>New password</label>
                <input 
                  type='password'
                  name='newPassword'
                  id='newPassword'
                  onChange={this.handleChange}
                  // value={newPassword}
                  placeholder='●●●●●●●●●●'
                />
                <label htmlFor='newPassword'>Confirm new password</label>
                <input 
                  type='password'
                  name='confirmNewPassword'
                  id='confirmNewPassword'
                  onChange={this.handleChange}
                  // value={confirmNewPassword}
                  placeholder='●●●●●●●●●●'
                />
              </div>
            }
          </div>
          <div className='submit-button-container'>
            <input className='submit-button' type='submit' value='SAVE ACCOUNT' />
          </div>
        </form>
        <div className='User-small-buttons'>
          {
            !showPassword && 
            <button className='App-small-button' onClick={this.changePasswordVisibility}>CHANGE PASSWORD</button>
          }
          <button className='App-small-button' onClick={onLogout}>LOGOUT</button>
        </div>
      </div>
    );
  }
}

export default withAuth(User);
