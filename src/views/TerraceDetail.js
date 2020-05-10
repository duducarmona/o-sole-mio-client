import React, { Component } from "react";
import apiClient from "../services/apiClient";

class TerraceDetail extends Component {
  state = {
    terrace: {}
  }

  componentDidMount() {
    this.getTerraceDetail();
  }

  // getTerraceDetail = async () => {
  //   const { params } = this.props.match;
    
  //   try {
  //     const responseFromApi = await apiClient.getTerraceDetail(params.id);
  //     const terrace = responseFromApi.data;
  //     console.log('terrace: ', terrace);
      

  //     this.setState({terrace});
  //     console.log('this.state.terrace: ', this.state.terrace);
      
  //   } catch (err) {
  //     console.log(err);
  //   }

    // apiClient
    //   .getTerraceDetail(params.id)
    //   .then((responseFromApi) => {
    //     const terrace = responseFromApi.data;
    //     console.log('terrace: ', terrace);
        
    //     this.setState(terrace);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  // };

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
    const { name, description, address } = this.state.terrace;
    
    return (
      <div>
        <h1>Terrace Detail</h1>
        <h2>Name: {name}</h2>
        <p>Description: {description}</p>
        <p>Address: {address}</p>
      </div>
    );
  }
}

export default TerraceDetail;
