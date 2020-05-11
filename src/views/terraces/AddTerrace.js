import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { withAuth } from '../../context/authContext';
import './AddTerrace.css';

class AddTerrace extends Component {
  state = {
    userId: this.props.user.data._id,
    type: 'bar',
    liveMusic: false,
    petFriendly: false,
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    picture: '',
    beerPrice: '',
    bestTapa: '',
    menuPicture: '',
    sunAmount: '',
    sunRegisterTime: ''
  };

  handleChange = (e) => {
    const target = e.target;
    const value = (target.name === 'liveMusic' || target.name === 'petFriendly') ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { 
      name, 
      userId, 
      description,
      address,
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
    } = this.state;
    
    apiClient
      .createTerrace({ 
        name, 
        userId, 
        description,
        address,
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
      })
      .then((res) => {
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
    } = this.state;

    return (
      <div className='AddTerrace'>
        <h1>New Terrace</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Name*</label>
          <input
            type='text'
            name='name'
            id='name'
            onChange={this.handleChange}
            value={name}
          />
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            onChange={this.handleChange}
            value={description}
          />
          <label htmlFor='address'>Address*</label>
          <input
            type='text'
            name='address'
            id='address'
            onChange={this.handleChange}
            value={address}
          />
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
          <label htmlFor='type'>Type</label>
          <select name='type' id='type' onChange={this.handleChange} value={type}>
            <option value='bar'>Bar</option>
            <option value='restaurant'>Restaurant</option>
          </select>
          <div className='AddTerrace-checkboxes'>
            <div className='AddTerrace-checkbox'>
              <label htmlFor='liveMusic'>Live music</label>
              <input
                type='checkbox'
                name='liveMusic'
                id='liveMusic'
                onChange={this.handleChange}
                checked={liveMusic}
              />
            </div>
            <div className='AddTerrace-checkbox'>
              <label htmlFor='petFriendly'>Pet friendly</label>
              <input
                type='checkbox'
                name='petFriendly'
                id='petFriendly'
                onChange={this.handleChange}
                checked={petFriendly}
              />
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
          <label htmlFor='sunAmount'>Sun amount</label>
          <select name='sunAmount' id='sunAmount' onChange={this.handleChange} value={sunAmount}>
            <option value=''>--Please choose an option--</option>
            <option value='totallySunny'>Totally sunny</option>
            <option value='partlySunny'>Partly sunny</option>
            <option value='notSunny'>Not sunny</option>
          </select>
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }
}

export default withAuth(AddTerrace);
