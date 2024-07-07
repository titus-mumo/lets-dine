import React, { useEffect, useState } from 'react'
import burger from '../assets/burger.jpeg'
import { useAuth } from '../hooks/AuthProvider'
import { ApiCall } from '../hooks/ApiCall'
import { Link, useNavigate } from 'react-router-dom'
import { ToastMessage } from '../utils'
import { Rating } from 'flowbite-react'

require('dotenv').config()

export const MealCard = ({meal, confirmDelete, setConfirmDelete, id, deleteMealName, setDeleteMealName, setDeleteMealId}) => {
    const {cuisine, meal_id, meal_name, category, average_rating} = meal
    let url;
    if(meal.meal_pic) {
      url = process.env.BASE_IMAGES + meal.meal_pic
    }
    const foodType = category
    const price = meal['price']
    const [loading, setLoading] = useState(true)
    const userAuth = useAuth();
    const {token, refresh, setToken, setRefresh} = userAuth
    const [cuisineName, setCuisineName] = useState('')

    const getCuisineName = () => {
      ApiCall(`cuisines/${cuisine}/`, 'get', token, refresh, setToken, setRefresh)
      .then(function(response){
        const {data, status} = response
        if(status === 200){
          setCuisineName(data.name)
          setLoading(false)
          return;
        }
        
      })
      .catch((error) => {
        return ToastMessage("error", "Ooops! Can't fetch cuisine names")
      });

    }

    useEffect(() => {getCuisineName()}, [cuisine])

    const navigate = useNavigate()

    const handleEdit = () => {
      navigate(`/cuisine-owner/cuisine/${cuisine}/edit`, {state: {meal : meal, cuisine_id : cuisine}} )
    }

    const handleDelete = (e, id) => {
      setConfirmDelete(true)
      if(id === meal_id){
        setDeleteMealName(meal_name)
        setDeleteMealId(meal_id)
      }
    }

    const [filled, setFilled] = useState(Math.round(average_rating) || 3)




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
                      <Link to={`/cuisine/${cuisine}/menu`} className="text-blue-400 text-sm">
                          {loading ? 'Loading...' : cuisineName.includes(' ') ? `${cuisineName.split(' ')[0]}.. ` : cuisineName.length > 10 ? `${cuisineName.slice(0, 9)}..` : cuisineName}
                      </Link>
                  </div>
                  <h2 className="text-gray-900 poppins text-md font-bold text-end">£{price}</h2>
              </div>
          </div>
          <div className='w-fit'>
          <Rating>
            <Rating.Star className={`${filled >=1? 'text-green-700': ''}`} />
            <Rating.Star className={`${filled >=2? 'text-green-700': ''}`} />
            <Rating.Star className={`${filled >=3? 'text-green-700': ''}`} />
            <Rating.Star className={`${filled >=4? 'text-green-700': ''}`} />
            <Rating.Star className={`${filled >=5? 'text-green-700': ''}`} />
          </Rating>
          </div>
          <div className='flex justify-between w-full'>
            <p className='p-1 text-green-700 text-sm hover:cursor-pointer transition duration-300' onClick={() => handleEdit()}>Edit</p>
            <p className='p-1 text-red-500 text-sm hover:cursor-pointer transition duration-300' onClick={(e) => handleDelete(e, id)}>Delete</p>
          </div>
      </div>
  )
}


