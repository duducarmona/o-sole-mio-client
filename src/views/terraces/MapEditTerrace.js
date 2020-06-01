import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapEditTerrace.css';
import axios from 'axios';

class MapEditTerrace extends Component {
  state = {
    marker: undefined,
    address: '',
  };

  componentDidMount() {
    // Get the terrace coordinates.
    let {lng, lat} = this.props.history.location.state;
    let map = undefined;

    // If the terrace doesn't have coordenates, get coordenates from the device's location.
    if (!lng || !lat) {  
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
        console.warn(`The location can't be obtained.`);

        // Plaza Cataluña coordinates.
        lng = 2.170127;
        lat = 41.386846;

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
      {timeout:10000});
    } 
    else {  // The terrace has coordinates, show the marker.
      let markerClick = undefined;

      map = new mapboxgl.Map({
        container: this.mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: 13,
      });

      // create DOM element for the marker
      const el = document.createElement('div');
      el.className = 'map-marker';

      // create the marker
      markerClick = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(map);

      this.setState({
        marker: markerClick
      });

      map.on('click', (e) => {
        this.clickEvent(e.lngLat.lng, e.lngLat.lat, map);
      });
    } 
  };

  getAddressAndSubmit = async () => {
    const { lng, lat } = this.state.marker._lngLat;
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
      pathname: `/terraces/${this.props.history.location.state.terraceId}/edit`,
      state: {
        address: this.state.address,
        lng: lng,
        lat: lat
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
    <div>
      <h2 className='MapEditTerrace-h2'>Select the terrace location</h2>
      <div ref={(el) => (this.mapContainer = el)} className='MapEditTerrace-mapContainer' />
      <div className='MapEditTerrace-button-container'>
        <button className='submit-button MapEditTerrace-button' onClick={this.getAddressAndSubmit}>SAVE LOCATION</button>
      </div>
    </div>
    );
  }
}

export default MapEditTerrace;
