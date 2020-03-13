function rad2deg(rad) {
  return rad * (180 / Math.PI);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getBoundingBox({ lat, lng }) {
  const radius = 1.60934;
  const earthRad = 6371;
  const maxLat = lat + rad2deg(radius / earthRad);
  const minLat = lat - rad2deg(radius / earthRad);
  const maxLng =
    lng + rad2deg(Math.asin(radius / earthRad) / Math.cos(deg2rad(lat)));
  const minLng =
    lng - rad2deg(Math.asin(radius / earthRad) / Math.cos(deg2rad(lat)));

  return {
    minLat,
    minLng,
    maxLat,
    maxLng,
  };
}

module.exports = getBoundingBox;
