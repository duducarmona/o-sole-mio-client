import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { withAuth } from '../../context/authContext';

class AddReview extends Component {
  state = {
    userId: this.props.user.data._id,
    terraceId: this.props.location.state.terraceId,
    title: '',
    text: '',
    rating: 0
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const {
      userId,
      terraceId,
      title,
      text,
      rating
    } = this.state;

    apiClient
      .createReview({
        userId,
        terraceId,
        title,
        text,
        rating
      })
      .then((res) => {
        history.push({
          pathname: `/terraces/${res.data.terraceId}/reviews`,
          state: {
            terraceId: res.data.terraceId
          }
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {
      title,
      text,
      rating
    } = this.state;

    return (
    <div>
      <h1>New Review</h1>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='title'>Title*</label>
        <input 
          type='text'
          name='title'
          id='title'
          onChange={this.handleChange}
          value={title}
        />
        <label htmlFor='text'>Review*</label>
        <textarea
          name='text'
          id='text'
          onChange={this.handleChange}
          value={text}
        />
        <label htmlFor='rating'>Rating*</label>
        <input 
          type='text'
          name='rating'
          id='rating'
          onChange={this.handleChange}
          value={rating}
        />
        <input type='submit' value='submit' />
      </form>
    </div>
    );
  }
}

export default withAuth(AddReview);
