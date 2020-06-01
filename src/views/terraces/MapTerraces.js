import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "./MapTerraces.css";
import apiClient from '../../services/apiClient';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

class MapTerraces extends Component {
  state = {
    lng: 2.170127,
    lat: 41.386846,
    features: []
  };

  componentDidMount() {
    let map = undefined;

    navigator.geolocation.getCurrentPosition(
      (pos) => { 
        map = new mapboxgl.Map({
          container: this.mapContainer,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [pos.coords.longitude, pos.coords.latitude],
          zoom: 13,
        });

        this.loadTerraces(map);
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

        this.loadTerraces(map);
      },
      {timeout:10000}
    );
  }

  buildHTMLPopup = (_id, title, sunAmount) => {
    const ratingImage = [];
    const greySun = '/images/sun-icon-grey.png';
    const yellowSun = '/images/sun-icon.png';
    const lengthRating = 5;

    for (let index = 0; index < sunAmount; index++) {
      ratingImage.push(yellowSun);
    }

    for (let index = sunAmount; index < lengthRating; index++) {
      ratingImage.push(greySun);
    }
    const html = `
      <a class='MapTerrace-a' href='/terraces/${_id}'>
        <h3 class='MapTerrace-h3'>${title}</h3>
        <div class='Terraces-sun-rating'>
          <img class='TerraceDetail-rating-icon' src=${ratingImage[0]} alt='sun' />
          <img class='TerraceDetail-rating-icon' src=${ratingImage[1]} alt='sun' />
          <img class='TerraceDetail-rating-icon' src=${ratingImage[2]} alt='sun' />
          <img class='TerraceDetail-rating-icon' src=${ratingImage[3]} alt='sun' />
          <img class='TerraceDetail-rating-icon' src=${ratingImage[4]} alt='sun' />
        </div>
      </a>
    `;

    return html;
  };

  loadTerraces = async (map) => {
    let terraces = undefined;
    let newFeature = undefined;
    const geojson = {
      type: 'FeatureCollection',
      features: []
    };
    
    try {
      terraces = await apiClient.getAllTerraces();
    } catch (error) {
      console.log(error);
    }

    terraces.data.forEach(terrace => {
      newFeature = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [terrace.lng, terrace.lat]
        },
        properties: {
          title: terrace.name,
          _id: terrace._id,
          sunAmount: terrace.sunAmount
        }
      }

      geojson.features.push(newFeature);
    });

    // add markers to map
    geojson.features.forEach((marker) => {
      if (marker.geometry.coordinates[0] && marker.geometry.coordinates[0]) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'map-marker';

        const popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(marker.geometry.coordinates)
            .setHTML(this.buildHTMLPopup(marker.properties._id, marker.properties.title, marker.properties.sunAmount))
            .addTo(map);

        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(popup)
          .addTo(map);
      }
    });
  };

  render() {
    return (
      <div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default MapTerraces;