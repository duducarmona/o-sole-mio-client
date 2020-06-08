import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { Link } from 'react-router-dom';
import './Terraces.css';
import Searcher from '../../components/Searcher';

class Terraces extends Component {
  state = {
    terraces: [],
    filterTerracesBy: ''
  };

  loadTerraces = () => {
    apiClient
      .getAllTerraces()
      .then(({ data }) => {
        this.setState({
          terraces: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadTerraces();
  }

  // handleDelete = (id) => {
  //   apiClient
  //     .deleteTerrace(id)
  //     .then(() => {
  //       console.log('done');
  //       this.loadTerraces();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  drawRating = (terrace) => {
    const ratingImage = [];
    const greySun = '/images/sun-icon-grey.png';
    const yellowSun = '/images/sun-icon.png';
    const lengthRating = 5;

    for (let index = 0; index < terrace.sunAmount; index++) {
      ratingImage.push(yellowSun);
    }

    for (let index = terrace.sunAmount; index < lengthRating; index++) {
      ratingImage.push(greySun);
    }

    return (
      <div className='Terraces-sun-rating'>
        <img className='TerraceDetail-rating-icon' src={ratingImage[0]} alt='sun' />
        <img className='TerraceDetail-rating-icon' src={ratingImage[1]} alt='sun' />
        <img className='TerraceDetail-rating-icon' src={ratingImage[2]} alt='sun' />
        <img className='TerraceDetail-rating-icon' src={ratingImage[3]} alt='sun' />
        <img className='TerraceDetail-rating-icon' src={ratingImage[4]} alt='sun' />
      </div>
    );
  };

  renderTerraces = () => {
    const { terraces, filterTerracesBy } = this.state;
    const filteredTerraces = terraces.filter(terrace => (terrace.name.toLowerCase()).indexOf(filterTerracesBy.toLowerCase()) >= 0);

    return filteredTerraces.map((terrace, index) => {
      return (
        <li key={index}>
          <Link className='Terraces-Link' to={`/terraces/${terrace._id}`}>
            <img className='App-big-img' src={terrace.picture} alt={terrace.name} onError={(e) => {e.target.src = '/images/default-terrace.jpg'}} />
            <div className='App-with-padding'>
              <div className='Terraces-info-under-img'>
                <h2>{terrace.name}</h2>
                {this.drawRating(terrace)}
              </div>
            </div>
          </Link>
          {/* <button
            onClick={(e) => {
              this.handleDelete(terrace._id);
            }}
          >
            Delete
          </button> */}
        </li>
      );
    });
  };

  handleSearch = (textToFilter) => {
    this.setState({
      filterTerracesBy: textToFilter
    });
  };

  render() {
    return (
      <div className='Terraces'>
        <Searcher setFilterTerraces={this.handleSearch}/>
        <ul>
          {this.renderTerraces()}
        </ul>
      </div>
    );
  }
}

export default Terraces;