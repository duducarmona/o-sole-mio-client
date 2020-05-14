import React, { Component } from "react";
import apiClient from '../../services/apiClient';

class EditReview extends Component {
  state = {
    title: '',
    text: '',
    rating: 0,
    terraceId: ''
  }

  componentDidMount() {
    this.getReviewDetail();
  }

  getReviewDetail = () => {
    const { params } = this.props.match;
    
    apiClient
      .getReviewDetail(params.id)
      .then((responseFromApi) => {
        const review = responseFromApi.data;
        const { 
          title, 
          text,
          rating,
          terraceId
        } = review;
        
        this.setState({
          title,
          text,
          rating,
          terraceId
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { id } = this.props.match.params;
    
    const { 
      title,
      text,
      rating
    } = this.state;

    apiClient
      .editReview(id, { 
        title,
        text,
        rating 
      })
      .then((res) => {
        history.push({
          pathname: `/terraces/${this.state.terraceId}/reviews`,
          state: {
            terraceId: this.state.terraceId
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
        <h1>Edit Review</h1>
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

export default EditReview;
