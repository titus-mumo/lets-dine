import React, {useState, useEffect} from "react"
import burger from '../assets/burger.jpeg'
import { useAuth } from '../hooks/AuthProvider'
import { ApiCall } from '../hooks/ApiCall'
import { Link } from 'react-router-dom'
import { ToastMessage } from "../utils"

export const RecommendedFoods = ({setItem}) => {
    const [trendingFoods, setTrendingFoods] = useState([])
    const [ratedFoods, setRatedFoods] = useState([])

    const userAuth = useAuth()
    const {token, refresh, setToken, setRefresh} = userAuth

    // useEffect(() => {
    //   fetchHighlyRatedFoods();
    //     ApiCall('gemini/trending-foods/', 'get', token, refresh, setToken, setRefresh)
    //     .then((response) => {
    //         setTrendingFoods(response.data)
    //         setItem(1)
    //     })
    //     .catch((error) => {
    //         ToastMessage("error", "Error fetching trending foods")
    //     })
        
    // }, [])


    //TODO

    const fetchHighlyRatedFoods = () => {
      ApiCall('rated-foods/', 'get', token, refresh, setToken, setRefresh)
      .then((response) => {
        console.log(response)
        response.status === 200? setRatedFoods(response.data) : '';
      })
      .catch((error) => {
        
      })
    }

    useEffect(() => {
      fetchHighlyRatedFoods()

    }, [])
    return(
      <div className="w-full">
      <div className="flex justify-around w-full">
        {
          ratedFoods.map((meal, index) => <FoodContainer meal={meal} key={index} />)
        }
      </div>

    </div>
    )
  }




require('dotenv').config()

const FoodContainer = ({meal}) => {
    const {cuisine_id, meal_name, category, price, rationale} = meal
    let url;
    if(meal.meal_pic) {
      url = meal.meal_pic.startsWith('/')? process.env.BASE_IMAGES + meal.meal_pic : process.env.BASE_URL + 'media/' +meal.meal_pic
    }
    const foodType = category

    const [loading, setLoading] = useState(true)

    const userAuth = useAuth();

    const {token, refresh, setToken, setRefresh} = userAuth

    const [cuisineName, setCuisineName] = useState('')

    const getCuisineName = () => {
      ApiCall(`cuisines/${cuisine_id}/`, 'get', token, refresh, setToken, setRefresh)
      .then(function(response){
        const {data, status} = response
        if(status === 200){
          setCuisineName(data.name)
          setLoading(false)
          return;
        }else{
          throw new Error(response.data.error)
        }
      })
      .catch((error) => {
        ToastMessage("error", "An error occured")
      });

    }

    useEffect(() => {
      getCuisineName()
      console.log(meal.meal_pic)
      console.log(url)
    }, [cuisine_id])



  return (
      <div className="hover:cursor-pointer bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl p-1 rounded-lg relative flex flex-col mb-1 w-40 items-start justify-start">
          <span className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 md:py-1  inline-block self-center mb-2">{foodType}</span>
          <div className="flex-grow flex justify-center">
              <img className="w-40 lg:w-64 mx-auto transform transition duration-300" src={meal.meal_pic ? url : burger} alt="" />
          </div>
          <div className="w-full flex flex-col items-center mt-auto space-y-2">
              <h1 className="text-gray-900 poppins text-sm text-center">{meal_name}</h1>
              <div className="w-full flex justify-between items-center px-2">
                  <div className="flex flex-row items-center">
                      <Link to={`/cuisine/${cuisine_id}/menu`} className="text-blue-400 text-sm">
                          {loading ? 'Loading...' : cuisineName.includes(' ') ? `${cuisineName.split(' ')[0]}.. ` : cuisineName.length > 10 ? `${cuisineName.slice(0, 9)}..` : cuisineName}
                      </Link>
                  </div>
                  <h2 className="text-gray-900 poppins text-md font-bold text-end">£{price}</h2>
              </div>
          </div>
      </div>
  )
}
