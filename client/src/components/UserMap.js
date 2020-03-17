import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import GpsFixedRoundedIcon from '@material-ui/icons/GpsFixedRounded';
import mapsStyle from '../models/mapsStyle.json'
import { MapsAPIKey } from '../models/config';

// minneapolis – write loading handlers
const defaultLoc = {lat: 44.9778, lng: -93.265};

export class UserMap extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.google);
    this.state = {
      location: defaultLoc,
      locError: 0,
      nearby: []
    };
    this.watchId = 0;
    this.uid = this.props.uid;
  }

  // set lat/lng state from current location
  getLocation = () => {
    this.watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        console.log('watchPosition fired');
         // on success
        let sendDB = false;
        this.setState(({locError, location: {lat, lng}}) => {
          const sameLoc = lat === coords.latitude && lng === coords.longitude;
          if (sameLoc && locError === coords.accuracy)
            return null;
          else if (sameLoc)
            return {
              locError: coords.accuracy
            }
          // on location change
          sendDB = true;
          return {
            location: {
              lat: coords.latitude,
              lng: coords.longitude
            },
            locError: coords.accuracy
          }
        });
        if (sendDB) this.storeLocation();
      },
      e => {
        console.log(e);
      },
      // config
      {maximumAge: 5000, timeout: 10000, enableHighAccuracy: true},
    );
  }

  // update location associated with uid in db
  storeLocation = async() => {
    const res = await axios.put(`/users/${this.uid}/location`, {
      location: this.state.location
    });
    console.log(res.data);
  }

  // broadcast location to nearby users 
  contactNearby = async() => {
    this.props.togglePulse();
    const res = await axios.post(`/users/${this.uid}/emergency`, {
      location: this.state.location
    });
    const { minLat, minLng, maxLat, maxLng } = res.data;
    console.log('minLat: %s, minLng: %s, maxLat: %s, maxLng: %s', minLat, minLng, maxLat, maxLng);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    console.log(this.state.locError);
    return (
      <>
        <Map
          google={this.props.google}
          onReady={this.getLocation}
          zoom={14}
          initialCenter={this.state.location}
          centerAroundCurrentLocation={true}
          styles={mapsStyle}
          style={mapContainer}
          disableDefaultUI={true}
          gestureHandling='greedy'
        >
          <Controls location={this.state.location} sendPulse={this.contactNearby} idealZoom={16}/>
          <Marker // user current location icon
            icon={{
              url: process.env.PUBLIC_URL + '/location-circle.png',
              scaledSize: new this.props.google.maps.Size(25, 25),
              anchor: new this.props.google.maps.Point(12.5, 12.5)
            }}
            position={this.state.location}
           />
          {this.state.nearby}
        </Map>
      </>
    );
  }
}

const ControlsPreStyle = (props) => (
  <div className={props.className}>
    <button onClick={() => props.sendPulse()}>
      <p>Emergency Pulse</p>
    </button>
    <IconButton onClick={() => {
      props.map.setZoom(props.idealZoom);
      props.map.panTo(props.location)
    }}>
      <GpsFixedRoundedIcon />
    </IconButton>
  </div>
)

const Controls = styled(ControlsPreStyle)`
  position: absolute;
  z-index: 30;
  background-color: red;
  top: 5%;
  left: 5%;
  width: 20vw;
  height: 10vh;
`

const mapContainer = {
  width: "100%",
  height: "100%",
  backgroundRepeat: "no-repeat",
  position: "relative",
  zIndex: 1
}

export default GoogleApiWrapper({
  apiKey: MapsAPIKey
})(UserMap);