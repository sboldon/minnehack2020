import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import mapsStyle from '../models/mapsStyle.json'
import { config } from '../models/config';

export class UserMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 44.9778,
      lng: -93.265,
      zoom: 14,
    };
    this.uid = localStorage.getItem('user');
    this.postLocation = this.postLocation.bind(this);
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
        <Map
          google={this.props.google}
          zoom={this.state.zoom}
          initialCenter={{lat: this.state.lat, lng: this.state.lng}}
          styles={mapsStyle}
          style={mapContainer}
          disableDefaultUI={true}
        >
      
          <Marker
            icon={{
              url: process.env.PUBLIC_URL + '/location-circle.png',
              scaledSize: new this.props.google.maps.Size(25, 25),
            }}
            position={{lat: this.state.lat, lng: this.state.lng}}></Marker>
        </Map>
    );
  }
}

const mapContainer = {
  width: "100%",
  height: "100%"
}


export default GoogleApiWrapper({
  apiKey: config.apiKey
})(UserMap);



//   center={{lat: this.state.lat, lng: this.state.lng}}