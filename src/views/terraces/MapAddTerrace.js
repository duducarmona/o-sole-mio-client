import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import './MapAddTerrace.css';
import axios from 'axios';

class MapAddTerrace extends Component {
  state = {
    lng: 2.170127,
    lat: 41.386846,
    marker: undefined,
    address: ''
  };

  componentDidMount() {
    let map = undefined;

    navigator.geolocation.getCurrentPosition((pos) => {
        map = new mapboxgl.Map({
          container: this.mapContainer,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [pos.coords.longitude, pos.coords.latitude],
          zoom: 13,
        });

        map.on('click', (e) => {
          this.clickEvent(e.lngLat.lng, e.lngLat.lat, map);
        });
      },
      () => {
        const { lng, lat } = this.state;
        
        console.warn(`The location can't be obtained.`)

        map = new mapboxgl.Map({
          container: this.mapContainer,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [lng, lat],
          zoom: 13,
        });

        map.on('click', (e) => {
          this.clickEvent(e.lngLat.lng, e.lngLat.lat, map);
        });
      },
      {timeout:10000}
    );
  };

  getAddressAndSubmit = async () => {
    const {lng, lat} = this.state.marker._lngLat;
    const { history } = this.props;
    let response = undefined;

    try {
      response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
    } catch (error) {
      console.log(error);
    }

    this.setState({
      address: response.data.features[0].place_name
    });

    history.push({
      pathname: '/terraces/add',
      state: {
        address: this.state.address,
        lng: this.state.lng,
        lat: this.state.lat
      }
    });
  }

  clickEvent = (lng, lat, map) => {
    let markerClick = undefined;                  
          
    if (this.state.marker) {
      this.state.marker.remove();
    }

    // create DOM element for the marker
    const el = document.createElement('div');
    el.className = 'map-marker';

    // create the marker
    markerClick = new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .addTo(map);

    this.setState({
      marker: markerClick,
      lng: markerClick._lngLat.lng,
      lat: markerClick._lngLat.lat
    });
  };

  render() {
    return (
    <div className='MapAddTerrace'>
      <h2 className='MapAddTerrace-h2'>Select the terrace location</h2>
      <div ref={(el) => (this.mapContainer = el)} className='MapAddTerrace-mapContainer' />
      <div className='MapAddTerrace-button-container'>
        <button className='submit-button MapAddTerrace-button' onClick={this.getAddressAndSubmit}>SAVE LOCATION</button>
      </div>
    </div>
    );
  }
}

export default MapAddTerrace;
