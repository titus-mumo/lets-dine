import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { CuisineTabs } from '../cuisineownercomponents';
import { useState, useEffect } from 'react';

require('dotenv').config();

const MapContainer = (props) => {
  const { location } = props;

  return (
    <Map
      google={props.google}
      zoom={8}
      initialCenter={{ lat: 51.5074, lng: -0.1278 }}
      center={location ? { lat: location.latitude, lng: location.longitude } : undefined}
      containerStyle={{ width: '100%', height: '780px' }}
    >
      {location && (
        <Marker
          position={{ lat: location.latitude, lng: location.longitude }}
          title={"Your current location"}
        />
      )}
    </Map>
  );
};

const MapDiv = GoogleApiWrapper({
  apiKey: process.env.API_KEY,
})(MapContainer);

const CurrentLocation = ({ setLocation }) => {
  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    };

    getLocation();

    // Logging the location after 3 seconds
    const timeoutId = setTimeout(() => {
      console.log(location);
    }, 3000);

    // Clear timeout if the component unmounts
    return () => clearTimeout(timeoutId);

  }, [setLocation]);
};

export const MapUser = () => {
  const [location, setLocation] = useState(null);

  return (
    <div className="w-full h-full flex flex-col mt-10 lg:mt-0 pt-2 lg:pt-0 px-2 md:px-3 lg:px-4 justify-around">
      <CuisineTabs />
      <CurrentLocation setLocation={setLocation}/>
      <div className="flex flex-col align-center mt-5 h-800px">
        <MapDiv location={location} />
      </div>
    </div>
  );
};
