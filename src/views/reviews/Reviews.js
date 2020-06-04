import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { Link } from 'react-router-dom';
import './Reviews.css';
import { withAuth } from '../../context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Reviews extends Component {
  state = {
    reviews: [],
    terraceNameFromProps: undefined,
    terraceIdFromProps: undefined
  };
  
  componentDidMount() {
    try {
      this.setState({
        terraceNameFromProps: this.props.location.state.terraceName,
        terraceIdFromProps: this.props.location.state.terraceId
      });
      
      this.loadReviews();
    } catch (error) {
      const {history} = this.props;
      history.push('/notFoundPage');
    }
  }

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
        const {history} = this.props;
        history.push('/notFoundPage');
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


  delete = (id) => {
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

  handleDelete = (id) => {
    toast.error(
      <div>
        <span>Delete review?</span>
        <button className='ToastContainer Toastify-delete-button' onClick={() => this.delete(id)}>Yes</button>
      </div>
    );
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
                <button className='Reviews-delete-button'
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
    const { terraceNameFromProps, terraceIdFromProps } = this.state;

    return (
      <div className='Reviews App-with-padding'>
        <ToastContainer className='ToastContainer'
          position='bottom-center'
          type='info'
          autoClose={false}>
        </ToastContainer>
        <h1 className='view-h1'>Reviews</h1>
        <h2 className='Reviews-h2'>{terraceNameFromProps}</h2>
        <div className='Reviews-add-container'> 
          <Link to={
            {
              pathname: `/terraces/${terraceIdFromProps}/reviews/add`,
              state: {
                terraceId: terraceIdFromProps
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