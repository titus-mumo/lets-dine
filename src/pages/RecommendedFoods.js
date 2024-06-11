import React, {useState, useEffect} from "react"
import burger from '../assets/burger.jpeg'
import { useAuth } from '../hooks/AuthProvider'
import { ApiCall } from '../hooks/ApiCall'
import { Link } from 'react-router-dom'

export const RecommendedFoods = ({setItem}) => {
    const [trendingFoods, setTrendingFoods] = useState([])
    const [ratedFoods, setRatedFoods] = useState([])

    const userAuth = useAuth()
    const {token, refresh, setToken, setRefresh} = userAuth

    useEffect(() => {
      fetchHighlyRatedFoods();
        ApiCall('gemini/trending-foods/', 'get', token, refresh, setToken, setRefresh)
        .then((response) => {
            console.log(response.data)
            setTrendingFoods(response.data)
            setItem(1)
        })
        .catch((error) => {
            console.log("Error feching trending foods", error)
        })
        
    }, [])

    const fetchHighlyRatedFoods = () => {
      ApiCall('rated-foods/', 'get', token, refresh, setToken, setRefresh)
      .then((response) => {
        response.status === 200? setRatedFoods(response.data) : '';
      })
      .catch((error) => {
        console.log("An error occured")
      })
    }
    const data = [
      {
        "cuisine_id":15,
        "meal_name":"Fries",
        "category": "Fast Food",
        "price": "10 usd",
        "rationale": "Trending",
        
      }
    ]
    return(
      <div>
      <div className='flex flex-wrap w-full self-center justify-center'>
       {
          data.map((meal, index) => <FoodContainer meal={meal} key={index} />)
       }
      </div>
      <div>
        {
            trendingFoods.length === 0? <p>Trending foods will appear here</p> : trendingFoods.filter((meal) => meal.length > 0).map((meal, index) => <p key={index}>{meal}</p>)
        }
      </div>
      <div>
        {
          ratedFoods.map((meal, index) => <p key={index}>{meal}</p>)
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
      url = process.env.BASE_IMAGES + meal.meal_pic
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
        }
        
      })
      .catch((error) => {
        return console.log("SOmething went wrong")
      });

    }

    useEffect(() => {getCuisineName()}, [cuisine_id])



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
                      {/* <p className="text-gray-500 poppins text-xs text-center mr-2">Cuisine: </p> */}
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
