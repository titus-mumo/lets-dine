import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { useState, useEffect } from 'react';
import { ApiCall } from '../hooks/ApiCall';
import { useAuth } from '../hooks/AuthProvider';
import { ToastMessage } from '../utils';
import { useParams } from 'react-router-dom';
require('dotenv').config();

const MapContainer =  (props) => {
  const { location, locations } = props;
  
  console.log(locations)

  return (
    <div className="w-full h-full">
      <Map
        google={props.google}
        zoom={8}
        initialCenter={{ lat: 51.5074, lng: -0.1278 }}
        center={locations ? { lat: locations.latitude, lng: locations.longitude } : undefined}
        containerStyle={{ height: '100%', width: '100%' }}
      >
        {location && (
          <Marker
            position={{ lat: location.latitude, lng: location.longitude }}
            title={"Your current location"}
          />
        )}
        {locations &&
            <Marker
              position={{ lat: locations.latitude, lng: locations.longitude }}
              title={String(locations.address)}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
              }}
            />
          }
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
          ToastMessage("error", "Error getting location")
        }
      );
    };

    getLocation();

  }, [setLocation]);
};

export const CuisineLocation = () => {
  const [location, setLocation] = useState(null);
  const [cuisineLocation, setCuisineLocation] = useState(null);

  const userAuth = useAuth();
  const { token, refresh, setToken, setRefresh } = userAuth;

  const params = useParams()
  const cuisine_id = params.cuisine_id

  useEffect(() => {
    ApiCall(`location/${cuisine_id}`, 'get', token, refresh, setToken, setRefresh)
      .then(function (response) {
        if (response.status === 200) {
          setCuisineLocation(response.data);
        }
      })
      .catch((error) => {
        ToastMessage("error", "Error fetching cuisine location")
      });
  }, [token, refresh, setToken, setRefresh]);

  return (
    <div className="w-full h-full flex flex-col mt-4 lg:mt-0 pt-2 lg:pt-0 px-2 md:px-3 lg:px-4 justify-around">
      <CurrentLocation setLocation={setLocation} />
      <div className="flex flex-col align-center mt-5 h-[800px] w-full rounded-md shadow-md">
        <div className="relative h-full w-full">
          <MapDiv location={location} locations={cuisineLocation} />
        </div>
      </div>
    </div>
  );
};
