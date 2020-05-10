import React, { Component } from 'react';
import apiClient from '../services/apiClient';
import { Link } from 'react-router-dom';

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
    const { name, description, address, _id } = this.state.terrace;
    
    return (
      <div>
        <h1>Terrace Detail</h1>
        <h2>Name: {name}</h2>
        <p>Description: {description}</p>
        <p>Address: {address}</p>
        <Link to={`/terraces/${_id}/edit`}>Edit Terrace</Link>
      </div>
    );
  }
}

export default TerraceDetail;
