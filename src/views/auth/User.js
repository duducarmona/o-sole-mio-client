import React, { Component } from "react";
import { withAuth } from '../../context/authContext';
import apiClient from '../../services/apiClient';
import './User.css';
import '../../App.scss';

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

    // apiClient
    //   .checkCorrectPassword(currentPassword, { hashedPassword: this.props.user.data.hashedPassword })
    //   .then()
    //   .catch((error) => {
    //     console.log(error);
    //   });

    apiClient
      .editUser(this.props.match.params.id, {
        username
      })
      .then((res) => {
        // history.push({
        //   pathname: `/terraces/${res.data.terraceId}/reviews`,
        //   state: {
        //     terraceId: res.data.terraceId
        //   }
        // })
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className='User'>
        <h1>My account</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input 
            type='text'
            name='username'
            id='username'
            onChange={this.handleChange}
            value={username}
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
          <div className='User-button-save-container'>
            <input type='submit' value='SAVE CHANGES' />
          </div>
          <div className='User-small-buttons'>
            {
              !showPassword && 
              <button className='App-small-button' onClick={this.changePasswordVisibility}>CHANGE PASSWORD</button>
            }
            <button className='App-small-button' onClick={onLogout}>LOGOUT</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(User);
