import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

import env from '../../../.env.json';

export default function Directions({ destination, origin, onReady }) {
  return (
    <MapViewDirections
      destination={destination}
      origin={origin}
      onReady={onReady}
      apikey={env.GOOGLE_API_KEY}
      strokeWidth={3}
      strokeColor="#222"
    />
  );
}
