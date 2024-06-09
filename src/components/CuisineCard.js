import React from 'react'
import { useNavigate } from 'react-router-dom'
import restaurantImage from '../assets/restaurant1.jpeg'
require('dotenv').config()
import moment from 'moment'
import { Call } from '@mui/icons-material'
import { LocationCity } from '@mui/icons-material'

export const CuisineCard = ({cuisine}) => {
    const {cuisine_id, contact, description,name, location, time_open, time_close} = cuisine
    
    const time = moment(time_open, "HH:mm:ss")
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
    <div className='flex flex-col m-1  justify-around shadow-md px-1.5 p-1 rounded-md w-400px h-500px hover:cursor-pointer hover:shadow-lg hover:bg-gray-200 transition-transformation duration-300'>
        <img src={url? url : restaurantImage} alt='cuisine image' className='m-auto h-56 rounded-md'></img>
        <div>
        <p className='poppins text-md font-medium'>{name}</p>
        <p className='text-sm'>{location}</p>
        <div className='flex items-center'>
          <Call />
          <p className='poppins text-sm ml-3'>{contact}</p>
        </div>
        <p className='poppins text-sm'>{description}</p>
        <p className='poppins text-xs border-1 border-green-500 bg-green-200 text-green-700 font-medium rounded-md shadow-sm w-fit p-0.5'>{time.format("hh:mm A")} - {moment(time_close, "HH:mm:ss").format("hh:mm A")}</p>
        </div>
        <div className='flex justify-between md:justify-around w-full'>
          <button className='my-1 mx-4 px-4 py-2 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-4 rounded-lg transition duration-300 poppins text-sm' onClick={(e) => makeReservation(e)}>Make Reservation</button>
          <button className= 'my-1 mx-4 px-4 py-2 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-4 rounded-lg transition duration-300 poppins text-sm' onClick={(e) => handleViewMenu(e)}>View Menu</button>
        </div>
    </div>
  )
}
