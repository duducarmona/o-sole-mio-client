import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { Link } from 'react-router-dom';
import './Reviews.css';

class Reviews extends Component {
  state = {
    reviews: []
  };

  loadReviews = () => {
    apiClient
      .getReviewsByTerrace(this.props.location.state.terraceId)
      .then(({ data }) => {
        this.setState({
          reviews: data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadReviews();
  }

  handleDelete = (id) => {
    apiClient
      .deleteReview(id)
      .then(() => {
        console.log('done');
        this.loadReviews();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderReviews = () => {
    const { reviews } = this.state;

    return reviews.map((review, index) => {
      return (
        <li key={index}>
          <h1>{review.title}</h1>
          <p>{review.text}</p>
          {review.rating}
          <button
            onClick={(e) => {
              this.handleDelete(review._id);
            }}
          >
            Delete
          </button>
        </li>
      );
    });
  };

  render() {
    return (
      <div className='Reviews'>
        <h1>REVIEWS LIST</h1>
        <div className='Reviews-Link'>
          <Link to={
            {
              pathname: `/terraces/${this.props.location.state.terraceId}/reviews/add`,
              state: {
                terraceId: this.props.location.state.terraceId
              }
            }
          }>
            Create Review
          </Link>
        </div>
        <ul>{this.renderReviews()}</ul>
      </div>
    );
  }
}

export default Reviews;
