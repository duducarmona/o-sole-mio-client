import React, { Component } from 'react';
import apiClient from '../services/apiClient';

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
          {terrace.name}
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
      <div>
        <h1>Terraces</h1>
        <ul>{this.renderTerraces()}</ul>
      </div>
    );
  }
}

export default Terraces;