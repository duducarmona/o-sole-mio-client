import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { Link } from 'react-router-dom';
import './Terraces.css';

class Terraces extends Component {
  state = {
    terraces: [],
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

  handleDelete = (id) => {
    apiClient
      .deleteTerrace(id)
      .then(() => {
        console.log('done');
        this.loadTerraces();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderTerraces = () => {
    const { terraces } = this.state;

    return terraces.map((terrace, index) => {
      return (
        <li key={index}>
          <Link className='Terraces-Link' to={`/terraces/${terrace._id}`}>
            <img className='App-big-img' src={terrace.picture} alt={terrace.name} />
            <div className='Terraces-info-under-img'>
              <h2>{terrace.name}</h2>
              <div className='Terraces-sun-rating'>
                <img className='Terraces-sun' src='images/sun-icon.png' alt='sun' />
                <img className='Terraces-sun' src='images/sun-icon.png' alt='sun' />
                <img className='Terraces-sun' src='images/sun-icon.png' alt='sun' />
                <img className='Terraces-sun' src='images/sun-icon-grey.png' alt='sun' />
                <img className='Terraces-sun' src='images/sun-icon-grey.png' alt='sun' />
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

  render() {
    return (
      <div className='Terraces'>
        <ul>{this.renderTerraces()}</ul>
      </div>
    );
  }
}

export default Terraces;