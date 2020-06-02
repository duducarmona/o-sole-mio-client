import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { withAuth } from '../../context/authContext';
import './AddTerrace.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddTerrace extends Component {
  state = {
    userId: this.props.user.data._id,
    type: 'bar',
    liveMusic: false,
    petFriendly: false,
    name: '',
    description: '',
    address: this.props.history.location.state.address,
    lng: this.props.history.location.state.lng,
    lat: this.props.history.location.state.lat,
    phone: '',
    email: '',
    picture: '',
    beerPrice: 0,
    bestTapa: '',
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

  handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

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
    const { 
      name, 
      userId, 
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
      freeTables,
      updates
    } = this.state;
    
    if (!name || name.trim() === '') {
      toast.info('Please, insert the name');
      this.nameInput.value = '';
      this.nameInput.focus();
    }
    else {
      apiClient
        .createTerrace({ 
          name, 
          userId, 
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
          sunRegisterTime: new Date(),
          freeTables,
          updates
        })
        .then((res) => {
          history.push('/terraces');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const { 
      name,
      description,
      address,
      phone,
      email,
      picture,
      beerPrice,
      bestTapa,
      menuPicture,
      sunImage,
    } = this.state;

    return (
      <div className='AddTerrace App-with-padding'>
        <ToastContainer className='ToastContainer'
          position='bottom-center'
          type='info'>
        </ToastContainer>
        <h1 className='view-h1'>Add terrace</h1>
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
          <div className='AddTerrace-address-container'>
            <input
              type='text'
              name='address'
              id='address'
              value={address}
              readOnly='readonly'
            />
            <Link className='AddTerrace-edit-address-link' to='/mapAddTerrace'><i className="material-icons">edit</i></Link>
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
                <input id="type-toggle-on" className="AddTerrace-EditTerrace-switch-toggle AddTerrace-EditTerrace-switch-toggle-left" name="type" value="bar" type="radio" defaultChecked onChange={this.handleChange} />
                <label htmlFor="type-toggle-on" className="AddTerrace-EditTerrace-switch"><i className="material-icons">local_bar</i></label>
                <input id="type-toggle-off" className="AddTerrace-EditTerrace-switch-toggle AddTerrace-EditTerrace-switch-toggle-right" name="type" value="restaurant" type="radio" onChange={this.handleChange} />
                <label htmlFor="type-toggle-off" className="AddTerrace-EditTerrace-switch"><i className="material-icons">restaurant</i></label>
              </div>
              <div>
                <label className='AddTerrace-EditTerrace-switch-labels' htmlFor='liveMusic'>Live music</label>
                <input id="liveMusic-toggle-on" className="AddTerrace-EditTerrace-switch-toggle AddTerrace-EditTerrace-switch-toggle-left" name="liveMusic" value="false" type="radio" defaultChecked onChange={this.handleChange} />
                <label htmlFor="liveMusic-toggle-on" className="AddTerrace-EditTerrace-switch">No</label>
                <input id="liveMusic-toggle-off" className="AddTerrace-EditTerrace-switch-toggle AddTerrace-EditTerrace-switch-toggle-right" name="liveMusic" value="true" type="radio" onChange={this.handleChange} />
                <label htmlFor="liveMusic-toggle-off" className="AddTerrace-EditTerrace-switch">Yes</label>
              </div>
              <div>
                <label className='AddTerrace-EditTerrace-switch-labels' htmlFor='petFriendly'>Pet friendly</label>
                <input id="petFriendly-toggle-on" className="AddTerrace-EditTerrace-switch-toggle AddTerrace-EditTerrace-switch-toggle-left" name="petFriendly" value="false" type="radio" defaultChecked onChange={this.handleChange} />
                <label htmlFor="petFriendly-toggle-on" className="AddTerrace-EditTerrace-switch">No</label>
                <input id="petFriendly-toggle-off" className="AddTerrace-EditTerrace-switch-toggle AddTerrace-EditTerrace-switch-toggle-right" name="petFriendly" value="true" type="radio" onChange={this.handleChange} />
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

export default withAuth(AddTerrace);
