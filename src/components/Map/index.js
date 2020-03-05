import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import getPixelSize from '../../utils/pixelSize';

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';
import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

import {
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  Back,
  Image,
} from './styles';

import env from '../../../.env.json';

Geocoder.init(env.GOOGLE_API_KEY);

export default function Map() {
  const mapRef = useRef();
  const [region, setRegion] = useState(null);
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const { results } = await Geocoder.from({ latitude, longitude });

        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
          address: results[0].formatted_address.split(',')[0],
        });
      },
      () => {},
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );
  }, []);

  function handleLocationSelected(data, { geometry }) {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;

    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
  }

  function onReadyDirections(result) {
    if (mapRef.current) {
      setDuration(Math.floor(result.duration));

      mapRef.current.fitToCoordinates(result.coordinates, {
        edgePadding: {
          top: getPixelSize(50),
          left: getPixelSize(50),
          right: getPixelSize(50),
          bottom: getPixelSize(350),
        },
      });
    }
  }

  function handleBack() {
    setDestination(null);
  }

  return (
    <View style={{ flex: 1 }}>
      {region ? (
        <>
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            region={region}
            showsUserLocation
            loadingEnabled
          >
            {destination && (
              <>
                <Directions
                  origin={region}
                  destination={destination}
                  onReady={onReadyDirections}
                />
                <Marker
                  coordinate={destination}
                  anchor={{ x: 0, y: 0 }}
                  image={markerImage}
                >
                  <LocationBox>
                    <LocationText>{destination.title}</LocationText>
                  </LocationBox>
                </Marker>

                <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
                  <LocationBox>
                    <LocationTimeBox>
                      <LocationTimeText>{duration}</LocationTimeText>
                      <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                    </LocationTimeBox>
                    <LocationText>{region.address}</LocationText>
                  </LocationBox>
                </Marker>
              </>
            )}
          </MapView>

          {destination ? (
            <>
              <Back onPress={handleBack}>
                <Image source={backImage} />
              </Back>
              <Details />
            </>
          ) : (
            <Search onLocationSelected={handleLocationSelected} />
          )}
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}
