import React from 'react'
import { useNavigate } from 'react-router-dom'
import restaurantImage from '../assets/restaurant1.jpeg'
require('dotenv').config()

export const CuisineCard = ({cuisine}) => {
    const {cuisine_id, contact, description,name, time_open} = cuisine

    let url;
    if(cuisine.cuisine_pic){
      url = process.env.BASE_IMAGES + cuisine.cuisine_pic
    }

    const navigate = useNavigate()

    const makeReservation = (e) => {
        e.preventDefault();
        setTimeout(() => navigate(`/cuisine/${cuisine_id}/make_reservation`))
    }

    const handleViewMenu= (e) => {
        e.preventDefault()
        setTimeout(() => navigate(`/cuisine/${cuisine_id}/menu`))
    }
  return (
    <div className='flex flex-col my-3 justify-around shadow-md p-2 rounded-md w-400px h-600px'>
        <img src={url? url : restaurantImage} alt='cuisine image' className='m-auto h-56 rounded-md'></img>
        <div>
        <p className='poppins text-md font-medium'>{name}</p>
        <p className='poppins'>{contact}</p>
        <p className='poppins'>{description}</p>
        <p className='poppins'>{time_open}</p>
        </div>
        <div className='flex justify-around w-full'>
          <button className='my-1 mx-4 px-4 py-2 bg-blue-500 text-white ring-red-400 focus:outline-none focus:ring-4 rounded-lg transition duration-300 poppins' onClick={(e) => makeReservation(e)}>Make Reservation</button>
          <button className= 'my-1 mx-4 px-4 py-2 bg-blue-500 text-white ring-red-400 focus:outline-none focus:ring-4 rounded-lg transition duration-300 poppins' onClick={(e) => handleViewMenu(e)}>View Menu</button>
        </div>
    </div>
  )
}
