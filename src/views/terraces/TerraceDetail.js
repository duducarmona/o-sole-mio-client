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
      menu
    } = this.state.terrace;
    
    return (
      <div className='TerraceDetail'>
        <img src={picture} alt={name} />
        <h1>{name}</h1>
        <p>{description}</p>
        <p>{address}</p>
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
        <p>Beer price: {beerPrice} {beerPrice && '€'}</p>
        <p>Best tapa: {bestTapa}</p>
        {type === 'bar' ? <p>Type: Bar</p> : <p>Type: Restaurant</p>}
        {liveMusic ? <p>Live music: Yes</p> : <p>Live music: No</p>}
        {petFriendly ? <p>Pet friendly: Yes</p> : <p>Pet friendly: No</p>}
        <h3>Menu:</h3>
        <img src={menu} alt='Menu' />
        <Link to={`/terraces/${_id}/edit`}>Edit Terrace</Link>
      </div>
    );
  }
}

export default TerraceDetail;
