import React, { useEffect, useState } from 'react'
import burger from '../assets/burger.jpeg'
import { useAuth } from '../hooks/AuthProvider'
import { ApiCall } from '../hooks/ApiCall'
import { Link } from 'react-router-dom'

export const MealCard = ({meal}) => {
    const {cuisine_id, meal_id, meal_name, category} = meal
    const foodType = category
    const price = meal['price']

    const [loading, setLoading] = useState(true)

    const userAuth = useAuth();

    const {token, refresh, setToken, setRefresh} = userAuth

    const handleOrder = (e) => {
      e.preventDefault();
    }

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
    <div className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl p-1 rounded-lg relative flex flex-col">
        <span className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block m-auto mb-2 ">{foodType}</span>
        <img className="w-64 mx-auto transform transition duration-300" src={burger} alt="" />
        <div className="flex flex-col items-center my-1 space-y-2">
            <h1 className="text-gray-900 poppins text-lg">{meal_name}</h1>
            <div className='w-full flex justify-around'>
              
              <div className='flex flex-row items-center'>
                <p className="text-gray-500 poppins text-sm text-center mr-2">Cuisine: </p>
                <Link to={`/cuisine/${cuisine_id}/menu`} className='hover:text-blue-400'>{loading ? 'Loading...' : cuisineName}</Link>
              </div>
              <h2 className="text-gray-900 poppins text-lg font-bold">${price}</h2>
            </div>
            {/* <button className="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105" onClick={(e) => handleOrder(e)}>Order Now</button> */}
        </div>
    </div>
  )
}
