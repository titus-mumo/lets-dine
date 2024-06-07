import React, { useEffect } from 'react'
import { CuisineTabs } from '../cuisineownercomponents'
import { useState } from 'react'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'
import { Api } from '@mui/icons-material'
import RestaurantImage from '../assets/restaurant1.jpeg'
import LoadingSpinner from './LandingPage'
require('dotenv').config()

export const Reccomendations = () => {
  const [recommedationTab, setRecommendationTab] = useState('cuisines')
  const [reviews, setReviews] = useState([])
  const userAuth = useAuth()
  const {token, refresh, setRefresh, setToken} = userAuth
  const [loading, setLoading] = useState(true)

  const fetchReviews = async (token, refresh, setToken, setRefresh) => {
    try {
      const response = await ApiCall('reviews', 'get', token, refresh, setToken, setRefresh);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  };
  
  const groupReviewsByCuisine = (reviews) => {
    return reviews.reduce((groups, review) => {
      const { cuisine, score } = review;
      if (!groups[cuisine]) {
        groups[cuisine] = { totalScore: 0, count: 0, reviews: [] };
      }
      groups[cuisine].totalScore += score;
      groups[cuisine].count += 1;
      groups[cuisine].reviews.push(review);
      return groups;
    }, {});
  };
  
  const calculateMeanScores = (cuisineGroups) => {
    return Object.keys(cuisineGroups).map((cuisineId) => ({
      cuisine: cuisineId,
      meanScore: cuisineGroups[cuisineId].totalScore / cuisineGroups[cuisineId].count,
      reviews: cuisineGroups[cuisineId].reviews,
    })).sort((a, b) => b.score - a.score);
  };
  
  const fetchCuisineNames = async (cuisineIds, token, refresh, setToken, setRefresh) => {
    try {
      const cuisineNames = await Promise.all(
        cuisineIds.map(async (id) => {
          const response = await ApiCall(`cuisines/${id}`, 'get', token, refresh, setToken, setRefresh);
          if (response.status === 200) {
            return { id, name: response.data.name };
          } else {
            return { id, name: 'Unknown Cuisine' };
          }
        })
      );
      return cuisineNames;
    } catch (error) {
      console.error('Error fetching cuisine names:', error);
      return [];
    }
  };
  
  const combineCuisineNamesWithReviews = (sortedCuisines, cuisineNames) => {
    return sortedCuisines.map(group => {
      const cuisineName = cuisineNames.find(cuisine => cuisine.id === group.cuisine)?.name || 'Unknown Cuisine';
      return { ...group, cuisineName };
    });
  };
  
  const handleRecommendCuisinesByReviews = async (token, refresh, setToken, setRefresh, setReviews) => {
    const reviews = await fetchReviews(token, refresh, setToken, setRefresh);
    const cuisineGroups = groupReviewsByCuisine(reviews);
    const sortedCuisines = calculateMeanScores(cuisineGroups);
    const cuisineIds = sortedCuisines.map(group => group.cuisine);
    const cuisineNames = await fetchCuisineNames(cuisineIds, token, refresh, setToken, setRefresh);
    const reviewsWithCuisineNames = combineCuisineNamesWithReviews(sortedCuisines, cuisineNames);
    const displayCuisines = reviewsWithCuisineNames.sort((a, b) => b.meanScore - a.meanScore).filter((cuisine) => cuisine.meanScore > 0.3).slice(0, 10)
    setReviews(displayCuisines)
  };

    useEffect(() => {
      handleRecommendCuisinesByReviews(token, refresh, setToken, setRefresh, setReviews);
    }, []);

    useEffect(() => {
      reviews.length === 0? setLoading(false): ''
    }, [reviews])


  return (
    <div className="w-full h-full flex justify-around flex-col mt-20 lg:mt-0 pt-2 lg:pt-0 px-2 w-full md:px-3 lg:px-4 ">
      {
        loading? <LoadingSpinner />:
        <div className=' w-full justify-around flex flex-col self-center'>
        <div className="z-10000 fixed lg:relative flex items-center justify-center py-2 w-full lg:w-2/3 top-10 lg:top-0 rounded-md bg-stone-700 self-center">
            <p className={recommedationTab === 'cuisines' ? "active_menu_tab poppins text-sm md:text-base bg-blue-500 py-0.5 px-2" : "menu_tab text-xs md:text-sm px-2 py-1 poppins "} onClick={() => setRecommendationTab('cuisines')}>Cuisines</p>
            <p className={recommedationTab === 'dishes' ? "active_menu_tab poppins text-sm md:text-base bg-blue-500 py-0.5 px-2" : "menu_tab text-xs md:text-sm px-2 py-1 poppins "} onClick={() => setRecommendationTab('dishes')}>Dishes</p>
        </div>
        <div>
          <div className='flex flex-wrap w-full self-center justify-center'>
            {
              reviews.map((review, index) => <RecommendedCuisine cuisineProp={review} tag='Reviews' key={index} />)
            }
          </div>
        </div>
      </div>
      }
  </div>
  )
}

const RecommendedCuisine = ({cuisineProp, tag}) => {
  const [cuisineInfo, setCuisineInfo] = useState({})
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const time_open = cuisineInfo?.time_open;
    const time_close = cuisineInfo?.time_close;

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
    setLoading(false)
  }, [cuisineInfo])

  const userAuth = useAuth()

  const {token, refresh, setToken, setRefresh} = userAuth

  const {cuisine, cuisineName} = cuisineProp

  const fetchCuisineInfo = () => {
    ApiCall(`cuisines/${cuisine}`, 'get', token, refresh, setToken, setRefresh)
    .then(function(response){
      if(response.status === 200){
        setCuisineInfo(response.data)
      }
    })
    .catch((error) => {
      console.log("An error occured fetching cuisine info", error)
    })
  }

  useEffect(() => {
    fetchCuisineInfo()
  }, [])

  return(
    <div className='self-center w-500px flex flex-col justify-center rounded-lg shadow-md m-2 py-2 hover:cursor-pointer bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl relative'>
        {
          cuisineInfo? loading? <LoadingSpinner />:
          <div className='flex flex-col justify-center w-full'>
          <div className='flex justify-between w-full items-center'>
          <h1 className="text-gray-900 poppins text-lg ml-3">{cuisineName}</h1>
          <p className={`${open? 'bg-green-200  border border-green-500 rounded-full text-green-900' : 'bg-red-100 border border-red-500 rounded-full text-primary'} text-sm poppins px-4 py-1 inline-block mb-2 mr-3 `}>{open? 'Open': 'Closed'}</p>
          <p className={`bg-blue-100 border border-blue-600 rounded-full text-blue-800 text-sm poppins px-4 py-1 inline-block mb-2 mr-3 `}>{tag}</p>
          </div>
            <img className="h-250px mx-auto transform transition duration-300" src={cuisineInfo.cuisine_pic? process.env.BASE_IMAGES + cuisineInfo.cuisine_pic : RestaurantImage}></img>
          <div>
            <p>{cuisineInfo.location}</p>
            <p>{cuisineInfo.contact}</p>
          </div>
          </div> :<LoadingSpinner />
        }
    </div>
  )
}
