import React, {useEffect, useState, useContext, createContext} from "react";
import { ToastMessage } from "../utils";

const CurrentLocationContext = createContext()

const CurrentLocationProvider = ({children}) => {
  const [latitude, setLatitude] = useState(3)
  const [longitude, setLongitude] = useState(3)
    useEffect(() => {
      const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            sessionStorage.setItem('latitude', position.coords.latitude)
            sessionStorage.setItem('longitude', position.coords.longitude)
          },
          (error) => {
            ToastMessage("error", "Error getting location")
          }
        );
      };
  
      getLocation();
  
    }, []);

    const values = {
      latitude,
      longitude,
    }

    return(
      <CurrentLocationContext.Provider value={values}>
        {children}
      </CurrentLocationContext.Provider>
    )
  };

export default CurrentLocationProvider;

export const currentLocation = () => {
  return useContext(CurrentLocationContext);
}