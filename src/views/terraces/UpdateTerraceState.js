import React, { Component } from "react";
import apiClient from '../../services/apiClient';
import './UpdateTerraceState.css';

class UpdateTerraceState extends Component {
  state = {
    sunImage: [
      '/images/sun-icon-grey.png',
      '/images/sun-icon-grey.png',
      '/images/sun-icon-grey.png',
      '/images/sun-icon-grey.png',
      '/images/sun-icon-grey.png'
    ],
    sunAmount: 0,
    freeTables: 0,
    updates: this.props.location.state.terraceUpdates
  }

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
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { history } = this.props;
    const { id } = this.props.match.params;
    const { 
      sunAmount,
      freeTables,
      updates
    } = this.state;

    apiClient
      .  updateTerraceState(id, { 
        sunAmount,
        freeTables,
        updates,
        sunRegisterTime: new Date()
      })
      .then((res) => {
        history.push(`/terraces/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { 
      sunImage,
      freeTables
    } = this.state;

    return (
    <div className='UpdateTerraceState App-with-padding'>
      <h1 className='view-h1'>Update state</h1>
      <form onSubmit={this.handleSubmit}>
      <div className='rating-icon-editable-container UpdateTerraceState-margin'>
        <div>
          <img className='rating-icon-editable' src={sunImage[0]} alt='sun' onClick={() => {this.handleRating(1)}}/>
          <img className='rating-icon-editable' src={sunImage[1]} alt='sun' onClick={() => {this.handleRating(2)}}/>
          <img className='rating-icon-editable' src={sunImage[2]} alt='sun' onClick={() => {this.handleRating(3)}}/>
          <img className='rating-icon-editable' src={sunImage[3]} alt='sun' onClick={() => {this.handleRating(4)}}/>
          <img className='rating-icon-editable' src={sunImage[4]} alt='sun' onClick={() => {this.handleRating(5)}}/>
        </div>
      </div>
        <div className='UpdateTerraceState-free-table-container-container'>
          <div className='UpdateTerraceState-free-table-container'>
            <img className='TerraceDetail-img-free-table' src='/images/free-table.png' alt='free table'/>
            <label htmlFor='freeTables'>Free tables:</label>
            <input
              type='text'
              name='freeTables'
              id='freeTables'
              onChange={this.handleChange}
              value={freeTables}
            />
          </div>
          <input className='submit-button' type='submit' value='SAVE STATE' />
        </div>
      </form>
    </div>
    );
  }
}

export default UpdateTerraceState;