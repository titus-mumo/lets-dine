import React from 'react'
import { useNavigate } from 'react-router-dom'
import restaurantImage from '../assets/restaurant1.jpeg'

export const CuisineCard = ({cuisine}) => {
    const {cuisine_id, contact, description,name, time_open} = cuisine

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
    <div className='flex flex-col w-auto m-auto my-3 jusify-center shadow-md p-2 rounded-md'>
        <img src={restaurantImage} alt='cuisine image' className='m-auto h-auto w-65 rounded-md'></img>
        <div>
        <p className='poppins'>{contact}</p>
        <p className='poppins'>{description}</p>
        <p className='poppins'>{name}</p>
        <p className='poppins'>{time_open}</p>
        </div>
        <button className='mx-4 px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins' onClick={(e) => makeReservation(e)}>Make Reservation</button>
        <button className= 'mx-4 px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins' onClick={(e) => handleViewMenu(e)}>View Menu</button>
    </div>
  )
}
