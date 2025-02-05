import React, { Component } from "react";
import apiClient from '../../services/apiClient';
import './EditTerrace.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditTerrace extends Component {
  state = {
    name: '',
    description: '',
    address: '',
    lng: 0,
    lat: 0,
    phone: '',
    email: '',
    picture: '',
    beerPrice: 0,
    bestTapa: '',
    type: '',
    liveMusic: false,
    petFriendly: false,
    menuPicture: '',
    sunAmount: 0,
    sunImage: [
      '/images/sun-icon-grey.png',
      '/images/sun-icon-grey.png',
      '/images/sun-icon-grey.png',
      '/images/sun-icon-grey.png',
      '/images/sun-icon-grey.png'
    ],
    sunRegisterTime: '' 
  }

  componentDidMount() {
    this.getTerraceDetail();
  }

  getTerraceDetail = async () => {
    const { params } = this.props.match;
    const { sunImage } = this.state;
    const newSunImage = [];
    let responseFromApi = undefined;
    let newAddress = undefined;
    let newLng = undefined;
    let newLat = undefined;

    // It the map loaded an address, use it.
    try {
      newAddress = this.props.history.location.state.address;
    } catch (error) {
    }

    // It the map loaded a longitude, use it.
    try {
      newLng = this.props.history.location.state.lng;
    } catch (error) {
    }

    // It the map loaded a longitude, use it.
    try {
      newLat = this.props.history.location.state.lat;
    } catch (error) {
    }

    try {
      responseFromApi = await apiClient.getTerraceDetail(params.id);   
      
      const terrace = responseFromApi.data;
      
      const {
        name, 
        description,
        address,
        lng,
        lat,
        phone,
        email,
        picture,
        beerPrice,
        bestTapa,
        type,
        liveMusic,
        petFriendly,
        menuPicture,
        sunAmount,
        sunRegisterTime
      } = terrace;
  
      this.setState({
        name,
        description,
        address: (newAddress ? newAddress : address),
        lng: (newLng ? newLng : lng),
        lat: (newLat ? newLat : lat),
        phone,
        email,
        picture,
        beerPrice: (beerPrice === null ? 0 : beerPrice),
        bestTapa,
        type,
        liveMusic,
        petFriendly,
        menuPicture,
        sunAmount,
        sunRegisterTime
      });
  
      for (let index = 0; index < sunAmount; index++) {
        newSunImage.push('/images/sun-icon.png');
      }
  
      for (let index = sunAmount; index < sunImage.length; index++) {
        newSunImage.push('/images/sun-icon-grey.png');
      }
  
      this.setState({
        sunImage: newSunImage
      });
    } catch (error) {
      console.log(error);
      const { history } = this.props;
      history.push('/notFoundPage');
    }
  };

  handleChange = (e) => {
    const target = e.target;
    let value;
    const name = target.name;
    const {
      liveMusic,
      petFriendly
    } = this.state;

    if (name === 'liveMusic') {
      value = !liveMusic;
    }
    else if (name === 'petFriendly') {
      value = !petFriendly;
    }
    else {
      value = target.value;
    }

    if (name === 'beerPrice') {
      value = this.correctBeerPrice(value);
    }

    this.setState({
      [name]: value
    });
  };

  handleRating = (sunPos) => {
    const { sunAmount, sunImage } = this.state;
    let newSunAmount = 1;
    const newSunImage = [];

    if (sunPos === 1 && sunAmount === 1) {
      newSunAmount = 0;
    }
    else {
      newSunAmount = sunPos;
    }

    for (let index = 0; index < newSunAmount; index++) {
      newSunImage.push('/images/sun-icon.png');
    }

    for (let index = newSunAmount; index < sunImage.length; index++) {
      newSunImage.push('/images/sun-icon-grey.png');
    }

    this.setState({
      sunAmount: newSunAmount,
      sunImage: newSunImage
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { id } = this.props.match.params;
    
    const { 
      name, 
      description,
      address,
      lng,
      lat,
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
    } = this.state;

    if (!name || name.trim() === '') {
      toast.info('Please, insert the name');
      this.nameInput.value = '';
      this.nameInput.focus();
    }
    else {
      apiClient
        .editTerrace(id, { 
          name, 
          description,
          address,
          lng,
          lat,
          phone,
          email,
          picture,
          beerPrice,
          bestTapa,
          type,
          liveMusic,
          petFriendly,
          menuPicture,
          sunAmount,
          sunRegisterTime: new Date()
        })
        .then((res) => {
          history.push(`/terraces/${id}`);
        })
        .catch((error) => {
          console.log(error);
          history.push('/notFoundPage');
        });
    }
  };

  correctBeerPrice = (value) => {
    // Delete spaces in the number.
    value = value.trim();

    // Delete the last character if is not a number.
    if (isNaN(value)) {
      value = value.slice(0, -1);
    }

    // If there is more than 1 digit and start with 0, delete the first 0.
    if (value.length > 1 && value.charAt(0) === '0' && value.charAt(1) !== '.') {
      value = value.slice(1);
    }

    // Allow only 2 decimals.
    const pointPos = value.indexOf('.');

    if (pointPos !== -1) {
      if (value.length - pointPos > 3) {
        value = value.slice(0, -1);
      }
    }

    return value;
  };

  render() {
    const { 
      name,
      description,
      address,
      lng,
      lat,
      phone,
      email,
      picture,
      beerPrice,
      bestTapa,
      type,
      liveMusic,
      petFriendly,
      menuPicture,
      sunImage
    } = this.state;

    return (
      <div className='EditTerrace App-with-padding'>
        <ToastContainer className='ToastContainer'
          position='bottom-center'
          type='info'>
        </ToastContainer>
        <h1 className='view-h1'>Edit terrace</h1>
        <form className='AddTerrace-EditTerrace-form' onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Name*</label>
          <input
            type='text'
            name='name'
            id='name'
            onChange={this.handleChange}
            value={name}
            ref={(input) => { this.nameInput = input; }}
          />
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            rows='3'
            onChange={this.handleChange}
            value={description}
          />
          <label htmlFor='address'>Address</label>
          <div className='EditTerrace-address-container'>
            <input
              type='text'
              name='address'
              id='address'
              readOnly='readonly'
              value={address}
            />
            <Link className='EditTerrace-edit-address-link' to={
              {
                pathname: '/mapEditTerrace',
                state: {
                  lng: lng,
                  lat: lat,
                  terraceId: this.props.match.params.id
                }
              }
            }><i className="material-icons">edit</i></Link>
          </div>
          <label htmlFor='phone'>Phone</label>
          <input
            type='text'
            name='phone'
            id='phone'
            onChange={this.handleChange}
            value={phone}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            onChange={this.handleChange}
            value={email}
          />
          <label htmlFor='sunAmount'>Sun amount</label>
          <div className='rating-icon-editable-container'>
            <div>
              <img className='rating-icon-editable' src={sunImage[0]} alt='sun' onClick={() => {this.handleRating(1)}}/>
              <img className='rating-icon-editable' src={sunImage[1]} alt='sun' onClick={() => {this.handleRating(2)}}/>
              <img className='rating-icon-editable' src={sunImage[2]} alt='sun' onClick={() => {this.handleRating(3)}}/>
              <img className='rating-icon-editable' src={sunImage[3]} alt='sun' onClick={() => {this.handleRating(4)}}/>
              <img className='rating-icon-editable' src={sunImage[4]} alt='sun' onClick={() => {this.handleRating(5)}}/>
            </div>
          </div>
          <label htmlFor='picture'>Picture</label>
          <input
            type='text'
            name='picture'
            id='picture'
            onChange={this.handleChange}
            value={picture}
          />
          <label htmlFor='beerPrice'>Beer price</label>
          <input
            type='text'
            name='beerPrice'
            id='beerPrice'
            onChange={this.handleChange}
            value={beerPrice}
          />
          <label htmlFor='bestTapa'>Best tapa</label>
          <input
            type='text'
            name='bestTapa'
            id='bestTapa'
            onChange={this.handleChange}
            value={bestTapa}
          />
          <div className='AddTerrace-EditTerrace-container-switches'>
            <div>
              <div>
                <label className='AddTerrace-EditTerrace-switch-labels' htmlFor='type'>Type</label>
                <input id="type-toggle-on" className="AddTerrace-EditTerrace-switch-toggle AddTerrace-EditTerrace-switch-toggle-left" name="type" value="bar" type="radio" onChange={this.handleChange} checked={type==='bar'} />
                <label htmlFor="type-toggle-on" className="AddTerrace-EditTerrace-switch"><i className="material-icons">local_bar</i></label>
                <input id="type-toggle-off" className="AddTerrace-EditTerrace-switch-toggle AddTerrace-EditTerrace-switch-toggle-right" name="type" value="restaurant" type="radio" onChange={this.handleChange} checked={type==='restaurant'} />
                <label htmlFor="type-toggle-off" className="AddTerrace-EditTerrace-switch"><i className="material-icons">restaurant</i></label>
              </div>
              <div>
                <label className='AddTerrace-EditTerrace-switch-labels' htmlFor='liveMusic'>Live music</label>
                <input id="liveMusic-toggle-on" className="AddTerrace-EditTerrace-switch-toggle AddTerrace-EditTerrace-switch-toggle-left" name="liveMusic" type="radio" onChange={this.handleChange} checked={!liveMusic} />
                <label htmlFor="liveMusic-toggle-on" className="AddTerrace-EditTerrace-switch">No</label>
                <input id="liveMusic-toggle-off" className="AddTerrace-EditTerrace-switch-toggle AddTerrace-EditTerrace-switch-toggle-right" name="liveMusic" type="radio" onChange={this.handleChange} checked={liveMusic} />
                <label htmlFor="liveMusic-toggle-off" className="AddTerrace-EditTerrace-switch">Yes</label>
              </div>
              <div>
                <label className='AddTerrace-EditTerrace-switch-labels' htmlFor='petFriendly'>Pet friendly</label>
                <input id="petFriendly-toggle-on" className="AddTerrace-EditTerrace-switch-toggle AddTerrace-EditTerrace-switch-toggle-left" name="petFriendly" type="radio" onChange={this.handleChange} checked={!petFriendly} />
                <label htmlFor="petFriendly-toggle-on" className="AddTerrace-EditTerrace-switch">No</label>
                <input id="petFriendly-toggle-off" className="AddTerrace-EditTerrace-switch-toggle AddTerrace-EditTerrace-switch-toggle-right" name="petFriendly" type="radio" onChange={this.handleChange} checked={petFriendly} />
                <label htmlFor="petFriendly-toggle-off" className="AddTerrace-EditTerrace-switch">Yes</label>
              </div>
            </div>
          </div>
          <label htmlFor='menuPicture'>Menu picture</label>
          <input
            type='text'
            name='menuPicture'
            id='menuPicture'
            onChange={this.handleChange}
            value={menuPicture}
          />
          <div className='submit-button-container'>
            <input className='submit-button' type='submit' value='SAVE TERRACE' />
          </div>
        </form>
      </div>
    );
  }
}

export default EditTerrace;