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
            <img src={terrace.picture} alt={terrace.name} />
            {terrace.name}
          </Link>
          <button
            onClick={(e) => {
              this.handleDelete(terrace._id);
            }}
          >
            Delete
          </button>
        </li>
      );
    });
  };

  render() {
    return (
      <div className='Terraces'>
        {/* <h1>Terraces</h1> */}
        <ul>{this.renderTerraces()}</ul>
      </div>
    );
  }
}

export default Terraces;