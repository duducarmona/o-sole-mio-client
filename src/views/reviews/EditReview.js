import React, { Component } from "react";
import apiClient from '../../services/apiClient';
import './EditReview.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditReview extends Component {
  state = {
    title: '',
    text: '',
    rating: 0,
    terraceId: '',
    ratingImage: [
      '/images/star-icon-grey.png',
      '/images/star-icon-grey.png',
      '/images/star-icon-grey.png',
      '/images/star-icon-grey.png',
      '/images/star-icon-grey.png'
    ]
  }

  componentDidMount() {
    this.getReviewDetail();
  }

  fillRating = () => {
    const { rating, ratingImage } = this.state;
    const newRatingImage = [];
    
    for (let index = 0; index < rating; index++) {
      newRatingImage.push('/images/star-icon-blue.png');
    }

    for (let index = rating; index < ratingImage.length; index++) {
      newRatingImage.push('/images/star-icon-grey.png');
    }

    this.setState({
      ratingImage: newRatingImage
    });
  }

  getReviewDetail = async () => {
    let { params } = this.props.match;
    let responseFromApi = undefined;

    try {
      responseFromApi = await apiClient.getReviewDetail(params.id);
    } catch (error) {
      console.log(error);
    }

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

    this.fillRating();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRating = (ratingPos) => {
    const { rating, ratingImage } = this.state;
    let newRating = 1;
    const newRatingImage = [];

    if (ratingPos === 1 && rating === 1) {
      newRating = 0;
    }
    else {
      newRating = ratingPos;
    }

    for (let index = 0; index < newRating; index++) {
      newRatingImage.push('/images/star-icon-blue.png');
    }

    for (let index = newRating; index < ratingImage.length; index++) {
      newRatingImage.push('/images/star-icon-grey.png');
    }

    this.setState({
      rating: newRating,
      ratingImage: newRatingImage
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { id } = this.props.match.params;
    
    const { 
      title,
      text,
      rating
    } = this.state;

    if (!title || title.trim() === '') {
      toast.info('Please, insert the title');
      this.titleInput.value = '';
      this.titleInput.focus();
    }
    else if (!text || text.trim() === '') {
      toast.info('Please, insert the review');
      this.textInput.value = '';
      this.textInput.focus();
    }
    else {
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
    }
  };

  render() {
    const { 
      title,
      text,
      ratingImage
    } = this.state;

    return (
      <div className='EditReview App-with-padding'>
        <ToastContainer className='ToastContainer'
          position='bottom-center'
          type='info'>
        </ToastContainer>
        <h1 className='view-h1'>Edit review</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='title'>Title*</label>
          <input
            type='text'
            name='title'
            id='title'
            onChange={this.handleChange}
            value={title}
            ref={(input) => { this.titleInput = input; }}
          />
          <label htmlFor='text'>Review*</label>
          <textarea
            name='text'
            id='text'
            rows='8'
            onChange={this.handleChange}
            value={text}
            ref={(input) => { this.textInput = input; }}
          />
          <div className='rating-icon-editable-container'>
            <div>
              <img className='rating-icon-editable' src={ratingImage[0]} alt='star' onClick={() => {this.handleRating(1)}}/>
              <img className='rating-icon-editable' src={ratingImage[1]} alt='star' onClick={() => {this.handleRating(2)}}/>
              <img className='rating-icon-editable' src={ratingImage[2]} alt='star' onClick={() => {this.handleRating(3)}}/>
              <img className='rating-icon-editable' src={ratingImage[3]} alt='star' onClick={() => {this.handleRating(4)}}/>
              <img className='rating-icon-editable' src={ratingImage[4]} alt='star' onClick={() => {this.handleRating(5)}}/>
            </div>
          </div>
          <div className='submit-button-container'>
            <input className='submit-button' type='submit' value='SAVE REVIEW' />
          </div>
        </form>
      </div>
    );
  }
}

export default EditReview;
