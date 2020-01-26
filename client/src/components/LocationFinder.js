import {React, useState, useEffect} from 'react';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
};


export default function LocationFinder({zoom=14, initialCenter={lat: 44.98, long: -93.25}, centerAroundCurrentLocation=false, visible=true}) {
  const [lat, setLat] = useState(initialCenter.lat);
  const [long, setLong] = useState(initialCenter.long);

  useEffect(() => {

  });

  return (

  )
}



