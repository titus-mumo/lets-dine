import React, { useEffect } from 'react'
import { CuisineTabs } from '../cuisineownercomponents'
import { useState } from 'react'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'
import { Api } from '@mui/icons-material'
import RestaurantImage from '../assets/restaurant1.jpeg'
require('dotenv').config()

export const Reccomendations = () => {
  const [recommedationTab, setRecommendationTab] = useState('cuisines')
  const [reviews, setReviews] = useState([])
  const userAuth = useAuth()
  const {token, refresh, setRefresh, setToken} = userAuth

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


  return (
    <div className="w-full h-full flex justify-around flex-col mt-20 lg:mt-0 pt-2 lg:pt-0 px-2 w-full md:px-3 lg:px-4 ">
    <div className=' w-full justify-around flex flex-col self-center'>
      <div className="z-10000 fixed lg:relative flex items-center justify-center py-2 w-full lg:w-2/3 top-10 lg:top-0 rounded-md bg-stone-700 self-center">
          <p className={recommedationTab === 'cuisines' ? "active_menu_tab poppins text-sm md:text-base bg-blue-500 py-0.5 px-2" : "menu_tab text-xs md:text-sm px-2 py-1 poppins "} onClick={() => setRecommendationTab('cuisines')}>Cuisines</p>
          <p className={recommedationTab === 'dishes' ? "active_menu_tab poppins text-sm md:text-base bg-blue-500 py-0.5 px-2" : "menu_tab text-xs md:text-sm px-2 py-1 poppins "} onClick={() => setRecommendationTab('dishes')}>Dishes</p>
      </div>
      <div>
        <p className='text-center'>Recommendations</p>
        <div>
          {
            reviews.map((review, index) => <RecommendedCuisine cuisineProp={review} tag='Reviews' key={index} />)
          }
        </div>
      </div>
    </div>
  </div>
  )
}

const RecommendedCuisine = ({cuisineProp, tag}) => {

  console.log(cuisineProp)
  const [cuisineInfo, setCuisineInfo] = useState({})

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
    <div>
        {
          cuisineInfo? <div>
            <img className="h-300px mx-auto transform transition duration-300" src={cuisineInfo.cuisine_pic? process.env.BASE_IMAGES + cuisineInfo.cuisine_pic : RestaurantImage}></img>
            <div>
            <h1 className="text-gray-900 poppins text-lg">{cuisineName}</h1>
            </div>
          </div> :<p>Fetching data..</p>
        }
    </div>
  )
  
}
