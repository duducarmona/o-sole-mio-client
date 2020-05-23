import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { withAuth } from '../../context/authContext';
import './AddTerrace.scss';

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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
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
        sunRegisterTime: new Date(),
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
      menuPicture,
      sunImage,
    } = this.state;

    return (
      <div className='AddTerrace App-with-padding'>
        <h1 className='AddTerrace-h1'>Add Terrace</h1>
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
            rows='3'
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
          <label htmlFor='sunAmount'>Sun amount</label>
          <div className='AddTerrace-rating-container'>
            <div>
              <img className='AddTerrace-sun-icon' src={sunImage[0]} alt='sun' onClick={() => {this.handleRating(1)}}/>
              <img className='AddTerrace-sun-icon' src={sunImage[1]} alt='sun' onClick={() => {this.handleRating(2)}}/>
              <img className='AddTerrace-sun-icon' src={sunImage[2]} alt='sun' onClick={() => {this.handleRating(3)}}/>
              <img className='AddTerrace-sun-icon' src={sunImage[3]} alt='sun' onClick={() => {this.handleRating(4)}}/>
              <img className='AddTerrace-sun-icon' src={sunImage[4]} alt='sun' onClick={() => {this.handleRating(5)}}/>
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
          <div className='AddTerrace-container-switches'>
            <div>
              <div>
                <label className='AddTerrace-switch-labels' htmlFor='type'>Type</label>
                <input id="type-toggle-on" className="type-toggle type-toggle-left" name="type" value="bar" type="radio" defaultChecked onChange={this.handleChange} />
                <label htmlFor="type-toggle-on" className="btn"><i className="material-icons">local_bar</i></label>
                <input id="type-toggle-off" className="type-toggle type-toggle-right" name="type" value="restaurant" type="radio" onChange={this.handleChange} />
                <label htmlFor="type-toggle-off" className="btn"><i className="material-icons">restaurant</i></label>
              </div>
              <div>
                <label className='AddTerrace-switch-labels' htmlFor='liveMusic'>Live music</label>
                <input id="liveMusic-toggle-on" className="liveMusic-toggle liveMusic-toggle-left" name="liveMusic" value="false" type="radio" defaultChecked onChange={this.handleChange} />
                <label htmlFor="liveMusic-toggle-on" className="btn">No</label>
                <input id="liveMusic-toggle-off" className="liveMusic-toggle liveMusic-toggle-right" name="liveMusic" value="true" type="radio" onChange={this.handleChange} />
                <label htmlFor="liveMusic-toggle-off" className="btn">Yes</label>
              </div>
              <div>
                <label className='AddTerrace-switch-labels' htmlFor='petFriendly'>Pet friendly</label>
                <input id="petFriendly-toggle-on" className="petFriendly-toggle petFriendly-toggle-left" name="petFriendly" value="false" type="radio" defaultChecked onChange={this.handleChange} />
                <label htmlFor="petFriendly-toggle-on" className="btn">No</label>
                <input id="petFriendly-toggle-off" className="petFriendly-toggle petFriendly-toggle-right" name="petFriendly" value="true" type="radio" onChange={this.handleChange} />
                <label htmlFor="petFriendly-toggle-off" className="btn">Yes</label>
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
          <div className='AddTerrace-submit-container'>
            <input className='AddTerrace-submit' type='submit' value='SAVE TERRACE' />
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(AddTerrace);
