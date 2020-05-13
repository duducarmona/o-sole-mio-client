import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { Link } from 'react-router-dom';
import './Reviews.css';

class Reviews extends Component {
  state = {
    reviews: []
  };

  loadReviews = () => {
    console.log('this.props.location.state.terraceId: ', this.props.location.state.terraceId);

    apiClient
      // .getTerraceDetail(this.props.location.state._id)
      .getReviewsByTerrace(this.props.location.state.terraceId)
      .then(({ data }) => {
        console.log('getReviews: ', data);
        
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

  renderReviews = () => {
    const { reviews } = this.state;

    return reviews.map((review, index) => {
      return (
        <li key={index}>
          <h1>{review.title}</h1>
          <p>{review.text}</p>
          {review.rating}
        </li>
      );
    });
  };

  render() {
    console.log('RENDER DE REVIEWS');
    
    console.log('this.props.location: ', this.props.location);

    return (
      <div className='Reviews'>
        <h1>REVIEWS LIST</h1>
        <div className='Reviews-Link'>
          {/* <Link to={`/terraces/${this.props.location.state._id}/reviews/add`}>Create Review</Link> */}
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
