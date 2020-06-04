import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { Link } from 'react-router-dom';
import './TerraceDetail.css';
import { withAuth } from '../../context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class TerraceDetail extends Component {
  state = {
    terrace: {},
    rating: 0,
    reviewsNumber: 0
  }

  componentDidMount() {
    this.getTerraceDetail();
    this.calculateStarRating();
  }

  componentDidUpdate() {
    window.scrollTo(0,0);
  };

  getTerraceDetail = () => {
    const { params } = this.props.match;
    
    apiClient
      .getTerraceDetail(params.id)
      .then((responseFromApi) => {
        const terrace = responseFromApi.data;
        
        this.setState({terrace});
      })
      .catch((err) => {
        console.log(err);
        const { history } = this.props;
        history.push('/notFoundPage');
      });
  };

  delete = () => {
    apiClient
      .deleteTerrace(this.props.match.params.id)
      .then(() => {
        const { history } = this.props;

        console.log('done');
        history.push('/terraces');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDelete = (id) => {
    toast.error(
      <div>
        <span>Delete terrace?</span>
        <button className='ToastContainer Toastify-delete-button' onClick={this.delete}>Yes</button>
      </div>
    );
  };

  drawRating = (sunStar) => {
    const ratingImage = [];
    const greySun = '/images/sun-icon-grey.png';
    const yellowSun = '/images/sun-icon.png';
    const greyStar = '/images/star-icon-grey.png';
    const blueStar = '/images/star-icon-blue.png';
    const lengthRating = 5;
    let amount;
    let emptyIcon;
    let fullIcon;

    if (sunStar === 'sun') {
      amount = this.state.terrace.sunAmount;
      emptyIcon = greySun;
      fullIcon = yellowSun;
    }
    else {
      amount = this.state.rating;
      emptyIcon = greyStar;
      fullIcon = blueStar;
    }

    for (let index = 0; index < amount; index++) {
      ratingImage.push(fullIcon);
    }

    for (let index = amount; index < lengthRating; index++) {
      ratingImage.push(emptyIcon);
    }

    return (
      <div className='Terraces-sun-rating'>
        <img className='TerraceDetail-rating-icon' src={ratingImage[0]} alt={sunStar} />
        <img className='TerraceDetail-rating-icon' src={ratingImage[1]} alt={sunStar} />
        <img className='TerraceDetail-rating-icon' src={ratingImage[2]} alt={sunStar} />
        <img className='TerraceDetail-rating-icon' src={ratingImage[3]} alt={sunStar} />
        <img className='TerraceDetail-rating-icon' src={ratingImage[4]} alt={sunStar} />
      </div>
    );
  };

  calculateStarRating = () => {
    const { params } = this.props.match;
    let average = 0;

    apiClient
      .getReviewsByTerrace(params.id)
      .then(({ data }) => {
        let sumRating = 0;
        
        data.forEach(review => {
          sumRating += review.rating;
        });
        
        if (data.length > 0) {
          average = sumRating / data.length;
        }

        this.setState({
          rating: average,
          reviewsNumber: data.length
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      name, 
      description, 
      address, 
      _id,
      phone,
      email,
      picture,
      beerPrice,
      bestTapa,
      type,
      liveMusic,
      petFriendly,
      menuPicture,
      userId,
      freeTables,
      updates
    } = this.state.terrace;

    return (
      <div className='TerraceDetail'>
        <ToastContainer className='ToastContainer'
          position='bottom-center'
          type='info'
          autoClose={false}>
        </ToastContainer>
        <img className='App-big-img' src={picture} alt={name} onError={(e) => {e.target.src = '/images/default-terrace.jpg'}} />
        <div className='App-with-padding'>
          <h2>{name}</h2>
          <div className='TerraceDetail-rating'>
            <Link to={
              {
                pathname: `/terraces/${_id}/updates`,
                state: {
                  terraceId: _id,
                  terraceUpdates: updates
                }
              }
            }>
              <div className='TerraceDetail-updates'>
                <div>
                  {this.drawRating('sun')}
                  <p className='TerraceDetail-rating-p'>{updates} updates</p>
                </div>
                <div className='TerraceDetail-free-table-container'>
                  <img className='TerraceDetail-img-free-table' src='/images/free-table.png' alt='free table'/>
                  <p className='TerraceDetail-p-free-table'>Free tables: {freeTables}</p>
                </div>
              </div>
            </Link>
            <Link to={
              {
                pathname: `/terraces/${_id}/reviews`,
                state: {
                  terraceId: _id,
                  terraceName: name
                }
              }
            }>
              <div className='TerraceDetail-reviews'>
                {this.drawRating('star')}
                <p className='TerraceDetail-rating-p'>{this.state.reviewsNumber} reviews</p>
              </div>
            </Link>
          </div>
          <p className='TerraceDetail-common-font'>{description}</p>
          <div className='TerraceDetail-line'>
            <i className="material-icons">place</i>
            <p>{address}</p>
          </div>
          <div className='TerraceDetail-line'>
            <i className="material-icons">phone</i>
            <p>{phone}</p>          
          </div>
          <div className='TerraceDetail-line'>
            <i className="material-icons">mail</i>
            <p>{email}</p>
          </div>
          <div className='TerraceDetail-line'>
            <i className="fa fa-beer" aria-hidden="true"></i>
            <p>Beer price: {beerPrice} {(beerPrice !== 0 && beerPrice) && '€'}</p>
          </div>
          <div className='TerraceDetail-line'>
            <i className="material-icons">fastfood</i>
            <p>Best tapa: {bestTapa}</p>
          </div>
          {type === 'bar' ? 
          <div className='TerraceDetail-line'>
            <i className="material-icons">local_bar</i>
            <p>Type: Bar</p>
          </div>
          : 
          <div className='TerraceDetail-line'>
            <i className="material-icons">restaurant</i>
            <p>Type: Restaurant</p>
          </div>
          }
          {liveMusic ? 
          <div className='TerraceDetail-line'>
            <i className="fa fa-music" aria-hidden="true"></i>
            <p>Live music: Yes</p>
          </div>
          : 
          <div className='TerraceDetail-line'>
            <i className="fa fa-music" aria-hidden="true"></i>
            <p>Live music: No</p>
          </div>
          }
          {petFriendly ? 
          <div className='TerraceDetail-line'>
            <i className="material-icons">pets</i>
            <p>Pet friendly: Yes</p>
          </div>
          : 
          <div className='TerraceDetail-line'>
            <i className="material-icons">pets</i>
            <p>Pet friendly: No</p>
          </div>
          }
          <div className='TerraceDetail-line'>
            <i className="material-icons">menu_book</i>
            <p>Menu:</p>
          </div>
        </div>
        <img className='App-big-img' src={menuPicture} alt='Menu' onError={(e) => {e.target.style.display='none'}} />
        {this.props.user.data._id === userId &&
          <div className='App-edit-delete-buttons-container'>
            <Link to={`/terraces/${_id}/edit`}><i className="material-icons App-edit-delete-button">edit</i></Link>
            <i className="material-icons App-edit-delete-button" onClick={(e) => {
                this.handleDelete(_id);
              }}>delete</i>
          </div>
        }
      </div>
    );
  }
}

export default withAuth(TerraceDetail);
