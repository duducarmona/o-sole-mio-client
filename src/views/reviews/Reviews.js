import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { Link } from 'react-router-dom';
import './Reviews.css';
import { withAuth } from '../../context/authContext';

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

  drawRating = (review) => {
    const ratingImage = [];
    const greyStar = '/images/star-icon-grey.png';
    const blueStar = '/images/star-icon-blue.png';
    const lengthRating = 5;

    for (let index = 0; index < review.rating; index++) {
      ratingImage.push(blueStar);
    }

    for (let index = review.rating; index < lengthRating; index++) {
      ratingImage.push(greyStar);
    }

    return (
      <div>
        <img className='TerraceDetail-rating-icon' src={ratingImage[0]} alt='star' />
        <img className='TerraceDetail-rating-icon' src={ratingImage[1]} alt='star' />
        <img className='TerraceDetail-rating-icon' src={ratingImage[2]} alt='star' />
        <img className='TerraceDetail-rating-icon' src={ratingImage[3]} alt='star' />
        <img className='TerraceDetail-rating-icon' src={ratingImage[4]} alt='star' />
      </div>
    );
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
          <h3>{review.title}</h3>
          <div className='Reviews-rating-edit-delete-container'>
            {this.drawRating(review)}
            {this.props.user.data._id === review.userId._id &&
              <div>
                <Link to={`/reviews/${review._id}/edit`}><i className="material-icons">edit</i></Link>
                <button
                  onClick={(e) => {
                    this.handleDelete(review._id);
                  }}
                >
                  <i className="material-icons">delete</i>
                </button>
              </div>
            }
          </div>
          <h4>{review.userId.username}</h4>
          <p>{review.text}</p>
        </li>
      );
    });
  };

  render() {
    return (
      <div className='Reviews App-with-padding'>
        <h1 className='view-h1'>Reviews</h1>
        <h2>{this.props.location.state.terraceName}</h2>
        <div className='Reviews-add-container'> 
          <Link to={
            {
              pathname: `/terraces/${this.props.location.state.terraceId}/reviews/add`,
              state: {
                terraceId: this.props.location.state.terraceId
              }
            }
          }>
            <i className='material-icons Reviews-add'>add_circle</i>
          </Link>
        </div>
        <ul>{this.renderReviews()}</ul>
      </div>
    );
  }
}

export default withAuth(Reviews);