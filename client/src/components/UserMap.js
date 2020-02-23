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
    this.uid = localStorage.getItem('user');
    this.postLocation = this.postLocation.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getNearby = this.getNearby.bind(this);
  }

  async postLocation() {
    const res = await axios.post('user/update-location', {
      uid: this.uid,
      location: {
        lat: this.state.lat,
        lng: this.state.lng,
      }
    });
    console.log(res.data);
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 15,
        }); // on success
      },
      // on nav fail
      e => {
        console.log(e);
      },
      // config
      {maximumAge: 0, timeout: 10000, enableHighAccuracy: true},
    );
  }

  async getNearby() {
    const res = await axios.get('/user/nearby-users', {
      params: {
        location: {lat: this.state.lat, lng:  this.state.lng}
      }
    })
    // const boundingBox = res.data;
    // console.log(boundingBox)
    // let bottomRight = (
    //   <Marker
    //     key={1}
    //     position={{lat: boundingBox.minLat, lng: boundingBox.maxLng }}
    //   />
    // )
    // let topLeft = (
    //   <Marker
    //     key={2}
    //     position={{lat: boundingBox.maxLat, lng: boundingBox.minLng }}
    //   />
    // )
    // this.setState({
    //   nearby: [...this.state.nearby, bottomRight, topLeft]
    // })
  }



  componentDidMount() {
    this.getLocation();
    this.interval = setInterval(() => this.getLocation(), 10000);
  }

  componentDidUpdate() {
    this.postLocation();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <>
        <ControlBox>
          <button onClick={this.getNearby}>
            <p>Find Nearby Users</p>
          </button>
          <button>
            <p>Center Map</p> 
          </button>
        </ControlBox>
        <Map
          google={this.props.google}
          zoom={this.state.zoom}
          initialCenter={{lat: this.state.lat, lng: this.state.lng}}
          centerAroundCurrentLocation
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



//   center={{lat: this.state.lat, lng: this.state.lng}}