import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { CuisineTabs } from '../cuisineownercomponents';
import { useState, useEffect } from 'react';
import { ApiCall } from '../hooks/ApiCall';
import { useAuth } from '../hooks/AuthProvider';

require('dotenv').config();

const MapContainer = (props) => {
  const { location, locations } = props;
  console.log(locations)

  return (
    <div className=''>
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
              {locations &&
          locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.latitude, lng: location.longitude }}
              title={location.address}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              }}
            />
          ))}
      </Map>
    </div>
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
  const [locations, setLocations] = useState(null);

  const userAuth = useAuth()
  const {token, refresh, setToken, setRefresh} = userAuth

  useEffect(() => {
    ApiCall('location','get', token, refresh, setToken, setRefresh)
    .then(function(response){
      if(response.status === 200){
        setLocations(response.data)
      }
    })
    .catch((error) => {
      console.error('Error fetching location data:', error);
    })
  }, [])






  return (
    <div className="w-full h-full flex flex-col mt-10 lg:mt-0 pt-2 lg:pt-0 px-2 md:px-3 lg:px-4 justify-around">
      <CurrentLocation setLocation={setLocation}/>
      <div className="flex flex-col align-center mt-5 h-800px">
        <MapDiv location={location} locations={locations} />
      </div>
    </div>
  );
};
