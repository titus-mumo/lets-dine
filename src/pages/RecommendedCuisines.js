import RestaurantImage from '../assets/restaurant1.jpeg'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'
import React from 'react'
import { useState, useEffect } from 'react'
import LoadingSpinner from './LandingPage'
import { ToastMessage } from '../utils'

export const RecommendedCuisines = ({setItem}) => {
    const [reviews, setReviews] = useState([])
    const userAuth = useAuth()
    const {token, refresh, setRefresh, setToken} = userAuth
    const [cuisineLocation, setCuisineLocation] = useState([])
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)

    const [recommendedCuisine, setRecommendedCuisine] = useState([])
    

    //RecommendCuisineBasedOnGeoLocation
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

    const fetchCuisinesBasedOnLocation = () => {

      const data = {
        latitude: parseFloat(sessionStorage.getItem('latitude')),
        longitude: parseFloat(sessionStorage.getItem('longitude'))
      }

      ApiCall(`cuisines_location?latitude=${data.latitude}&longitude=${data.longitude}`, 'get', token, refresh, setToken, setRefresh, data)
      .then((response) => {
        if(response.status = 200){
          const cuisinesBasedOnLocation = response.data.map(item => ({
            ...item,
            tag: 'location'
          }))
          setCuisineLocation(cuisinesBasedOnLocation)
          setRecommendedCuisine(prev => [...prev, ...cuisinesBasedOnLocation])
          return
        } else{
          throw new Error(response.data)
        }
        
      })
      .catch((error) => {
        ToastMessage("error", error.message? error.message : "An error occured")
      })

    }

    //RecommendCuisineBasedOnReviews
  
    const fetchReviews = async (token, refresh, setToken, setRefresh) => {
      try {
        const response = await ApiCall('recommended-cuisines-based-on-reviews', 'get', token, refresh, setToken, setRefresh);

        if (response.status === 200) {
          const updatedData = response.data.map((cuisine) => ({
            ...cuisine,
            tag: 'reviews'
          }))
          setReviews(updatedData)
          setRecommendedCuisine(prev => [...prev, ...updatedData])
          setItem(1)
        } else {
          throw new Error('Failed to fetch reviews');
        }
      } catch (error) {
        ToastMessage("error", "An eror occured")
        return [];
      }
    };

    const fetchRecommendation = async() => {
      await fetchReviews(token, refresh, setToken, setRefresh, setReviews);
      fetchCuisinesBasedOnLocation()
    }

      useEffect(() => {
        getLocation()
        fetchRecommendation()
      }, []);


      const shuffleArray = (array) => {
        const seen = new Set();
        array = array.filter(cuisine => {
            const id = cuisine.cuisine_id;
            if (seen.has(id)) {
                return false;
            } else {
                seen.add(id);
                return true;
            }
        });
        
        // for (let i = array.length - 1; i > 0; i--) {
        //     const j = Math.floor(Math.random() * (i + 1));
        //     [array[i], array[j]] = [array[j], array[i]];
        // }
        // console.log(array)
        return array;
    };
    

  return(
    <div>
    <div className='flex flex-wrap w-full self-center justify-center'>
    {
        shuffleArray([...recommendedCuisine]).map((review, index) => (
                <RecommendedCuisine cuisineProp={review} key={index} />
      ))
    }
    </div>


  </div>
  )
}


const RecommendedCuisine = ({cuisineProp}) => {
    const [open, setOpen] = useState(true)
  
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const time_open = cuisineProp.time_open;
      const time_close = cuisineProp.time_close;
  
      if (time_open && time_close) {
          const currentTime = new Date();
          const currentHours = currentTime.getHours();
          const currentMinutes = currentTime.getMinutes();
          
          const [openHours, openMinutes] = time_open.split(':').map(Number);
          let [closeHours, closeMinutes] = time_close.split(':').map(Number);
  
          // Handle closing time after midnight
          if (closeHours < openHours || (closeHours === openHours && closeMinutes < openMinutes)) {
              closeHours += 24; // Add 24 hours to closing time
          }
  
          if (
              (currentHours > openHours || (currentHours === openHours && currentMinutes >= openMinutes)) &&
              (currentHours < closeHours || (currentHours === closeHours && currentMinutes < closeMinutes))
          ) {
              setOpen(true); // Open
          } else {
              setOpen(false); // Closed
          }
      } else {
          setOpen(false); // Opening and closing times not provided
      }
    }, [])
  
  
    const {name, tag, location, contact, cuisine_pic} = cuisineProp

    useEffect(() => {
    setLoading(false)
    
    },[]) 

    return(
      <div className='h-350px px-1 md:px-2 self-center w-400px flex flex-col justify-center rounded-lg shadow-md m-1 hover:cursor-pointer bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl relative'>
        <div className='flex flex-col justify-center w-full'>
            {
              !loading? 
              <>
              <div className='flex justify-between w-full items-center'>
              <p className="text-gray-900 poppins text-md ml-1">{name}</p>
              <p className={`${open? 'bg-green-200  border border-green-500 rounded-full text-green-900' : 'bg-red-100 border border-red-500 rounded-full text-primary'} text-xs md:text-sm poppins px-2 md:px-3 md:py-1 inline-block mb-2 mr-3 `}>{open? 'Open': 'Closed'}</p>
              <p className={`bg-blue-100 border border-blue-600 rounded-full text-blue-800 text-xs md:text-sm poppins px-2 md:px-3 md:py-1 inline-block mb-2 mr-3 `}>{tag}</p>
              </div>
                <img className="h-250px mx-auto transform transition duration-300" src={cuisineProp.cuisine_pic? process.env.BASE_IMAGES + cuisine_pic : RestaurantImage}></img>
              <div>
                <p className='text-sm'>{location}</p>
                <p className='text-sm'>{contact}</p>
              </div> </>:<LoadingSpinner />
            }
           </div>
      </div>
    )
  }