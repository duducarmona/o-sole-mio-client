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
      sunAmount
    } = this.state.terrace;
    
    return (
      <div className='TerraceDetail'>
        <img className='App-big-img' src={picture} alt={name} />
        <h2>{name}</h2>
        <p>{description}</p>
        {sunAmount === 'totallySunny' && <p>Totally sunny</p>}
        {sunAmount === 'partlySunny' && <p>Partly sunny</p>}
        {sunAmount === 'notSunny' && <p>Not sunny</p>}
        <p>{address}</p>
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
        <p>Beer price: {beerPrice} {beerPrice && '€'}</p>
        <p>Best tapa: {bestTapa}</p>
        {type === 'bar' ? <p>Type: Bar</p> : <p>Type: Restaurant</p>}
        {liveMusic ? <p>Live music: Yes</p> : <p>Live music: No</p>}
        {petFriendly ? <p>Pet friendly: Yes</p> : <p>Pet friendly: No</p>}
        <h3>Menu:</h3>
        <img src={menuPicture} alt='Menu' />
        <div className='TerraceDetail-Link'>
          <Link to={`/terraces/${_id}/edit`}>Edit Terrace</Link>
        </div>
        <div className='TerraceDetail-Link'>
          <Link to={
            {
              pathname: `/terraces/${_id}/reviews`,
              state: {
                terraceId: _id
              }
            }
          }>
            Reviews
          </Link>
        </div>
      </div>
    );
  }
}

export default TerraceDetail;
