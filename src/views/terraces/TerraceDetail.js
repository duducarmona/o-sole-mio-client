import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { Link } from 'react-router-dom';
import './TerraceDetail.css';

class TerraceDetail extends Component {
  state = {
    terrace: {}
  }

  componentDidMount() {
    this.getTerraceDetail();
  }

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
      });
  };

  handleDelete = (id) => {
    apiClient
      .deleteTerrace(id)
      .then(() => {
        const { history } = this.props;

        console.log('done');
        history.push('/terraces');
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      // sunAmount
    } = this.state.terrace;
    
    return (
      <div>
        <img className='App-big-img' src={picture} alt={name} />
        <div className='App-with-padding'>
          <h2>{name}</h2>
          <div className='TerraceDetail-rating'>
            <div>
              <img className='TerraceDetail-rating-icon' src='/images/sun-icon.png' alt='sun' />
              <img className='TerraceDetail-rating-icon' src='/images/sun-icon.png' alt='sun' />
              <img className='TerraceDetail-rating-icon' src='/images/sun-icon.png' alt='sun' />
              <img className='TerraceDetail-rating-icon' src='/images/sun-icon-grey.png' alt='sun' />
              <img className='TerraceDetail-rating-icon' src='/images/sun-icon-grey.png' alt='sun' />
              <p className='TerraceDetail-rating-p'>345 participations</p>
            </div>
            <Link to={
              {
                pathname: `/terraces/${_id}/reviews`,
                state: {
                  terraceId: _id
                }
              }
            }>
              <div className='TerraceDetail-reviews'>
                <img className='TerraceDetail-rating-icon' src='/images/star-icon-blue.png' alt='star' />
                <img className='TerraceDetail-rating-icon' src='/images/star-icon-blue.png' alt='star' />
                <img className='TerraceDetail-rating-icon' src='/images/star-icon-blue.png' alt='star' />
                <img className='TerraceDetail-rating-icon' src='/images/star-icon-blue.png' alt='star' />
                <img className='TerraceDetail-rating-icon' src='/images/star-icon-grey.png' alt='star' />
                <p className='TerraceDetail-rating-p'>214 reviews</p>
              </div>
            </Link>
          </div>
          <p className='TerraceDetail-common-font'>{description}</p>
          {/* {sunAmount === 'totallySunny' && <p>Totally sunny</p>}
          {sunAmount === 'partlySunny' && <p>Partly sunny</p>}
          {sunAmount === 'notSunny' && <p>Not sunny</p>} */}
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
            <p>Beer price: {beerPrice} {beerPrice && '€'}</p>
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
        <img className='App-big-img' src={menuPicture} alt='Menu' />
        <div className='App-edit-delete-buttons-container'>
          <Link to={`/terraces/${_id}/edit`}><i className="material-icons App-edit-delete-button">edit</i></Link>
          <i className="material-icons App-edit-delete-button" onClick={(e) => {
              this.handleDelete(_id);
            }}>delete</i>
        </div>
      </div>
    );
  }
}

export default TerraceDetail;
