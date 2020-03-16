import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import styled from 'styled-components';
import mapsStyle from '../models/mapsStyle.json'
import { config } from '../models/config';

export class UserMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 44.9778,
      lng: -93.265,
      zoom: 14,
      nearby: []
    };
    this.watchId = 0;
    this.uid = this.props.uid;
    this.storeLocation = this.storeLocation.bind(this);
    this.contactNearby = this.contactNearby.bind(this);
  }


  // set lat/lng state from current location
  getLocation = () => {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        console.log('watchPosition fired');
         // on success
        this.setState({ // db update on location change
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 15,
        }, () => this.storeLocation());
      },
      e => {
        console.log(e);
      },
      // config
      {maximumAge: 0, timeout: 10000, enableHighAccuracy: true},
    );
  }

  // update location associated with uid in db
  async storeLocation() {
    const res = await axios.put(`/users/${this.uid}/location`, {
      location: {
        lat: this.state.lat,
        lng: this.state.lng,
      }
    });
    console.log(res.data);
  }

  async contactNearby() {
    this.props.togglePulse();
    const res = await axios.post(`/users/${this.uid}/emergency`, {
      location: {
        lat: this.state.lat,
        lng: this.state.lng,
      }
    });
    const { minLat, minLng, maxLat, maxLng } = res.data;
    console.log('minLat: %s, minLng: %s, maxLat: %s, maxLng: %s', minLat, minLng, maxLat, maxLng);
  }

  componentDidMount() {
    this.getLocation();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return (
      <>
        <ControlBox>
          <button onClick={() => this.contactNearby()}>
            <p>Emergency Pulse</p>
          </button>
        </ControlBox>
        <Map
          google={this.props.google}
          zoom={this.state.zoom}
          initialCenter={{lat: this.state.lat, lng: this.state.lng}}
          centerAroundCurrentLocation={true}
          styles={mapsStyle}
          style={mapContainer}
          disableDefaultUI={true}
        >
      
          <Marker
            icon={{
              url: process.env.PUBLIC_URL + '/location-circle.png',
              scaledSize: new this.props.google.maps.Size(25, 25),
            }}
            position={{lat: this.state.lat, lng: this.state.lng}}
           />
          {this.state.nearby}
        </Map>
      </>
    );
  }
}

const mapContainer = {
  width: "100%",
  height: "100%",
  backgroundRepeat: "no-repeat",
  position: "relative",
  zIndex: 1
}

const ControlBox = styled.div`
  position: absolute;
  z-index: 30;
  background-color: red;
  top: 5%;
  left: 5%;
  width: 20vw;
  height: 10vh;
`


export default GoogleApiWrapper({
  apiKey: config.apiKey
})(UserMap);