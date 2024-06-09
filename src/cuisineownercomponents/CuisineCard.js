import React from 'react'
import { useNavigate } from 'react-router-dom'
import restaurantImage from '../assets/restaurant1.jpeg'

export const CuisineCard = ({cuisine}) => {
    const {cuisine_id, contact, description,name, time_open} = cuisine
    let url;
    if(cuisine.cuisine_pic){
      url = process.env.BASE_IMAGES + cuisine.cuisine_pic
    }
    const navigate = useNavigate()

    const handleViewMenu= (e) => {
        e.preventDefault()
        setTimeout(() => navigate(`/cuisine-owner/cuisine/${cuisine_id}/menu`), 100)
    }
  return (
    <div className='flex flex-col w-400px m-1 justify-around shadow-md p-0.5 rounded-md h-500px hover:cursor-pointer hover:shadow-lg hover:bg-gray-200 transition-transformation duration-300'>
        <img src={url? url : restaurantImage} alt='cuisine image' className='m-auto h-56 rounded-md'></img>
        <div >
          <p className='poppins text-sm font-medium'>{name}</p>
          <p className='poppins'>{contact}</p>
          <p className='poppins text-sm'>{description}</p>
          <p className='poppins'>{time_open}</p>
        </div>
        {/* <button className='mx-4 px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins' onClick={(e) => makeReservation(e)}>Make Reservation</button> */}
        <div>
          <button className= 'my-1 mx-4 px-4 py-2 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 mt-3 rounded-lg transition duration-300 poppins' onClick={(e) => handleViewMenu(e)}>View Menu</button>
        </div>
    </div>
  )
}
