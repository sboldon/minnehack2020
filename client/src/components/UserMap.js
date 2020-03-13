import React, { Component } from 'react';
import Websocket from 'react-websocket';
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
    this.onOpen = this.onOpen.bind(this);
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

  async getNearby() {
    const res = await axios.get('/user/nearby-users', {
      params: {
        location: {lat: this.state.lat, lng:  this.state.lng}
      }
    })
  }

  onMsg(data) {
    console.log('user received %s', data);
  }

  onOpen() {
    console.log("ws connected");
    const msg = {
      newUser: true,
      uid: this.uid
    };
    this.send(JSON.stringify(msg));
  }

  onClose() {
    console.log("ws disconnected");
  }

  send(msg) {
    this.refSend.sendMessage(msg);
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
        <Websocket 
          url='ws://localhost:5000'
          onMessage={this.onMsg}
          onOpen={this.onOpen}
          onClose={this.onClose}
          reconnect={true}
          debug={true}
          ref={Websocket => {
            this.refSend = Websocket;
          }}
        />
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