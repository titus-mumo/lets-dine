import React from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div>
        <p>{contact}</p>
        <p>{description}</p>
        <p>{name}</p>
        <p>{time_open}</p>
        <button onClick={(e) => makeReservation(e)}>Make Reservation</button>
        <button onClick={(e) => handleViewMenu(e)}>View Menu</button>
    </div>
  )
}
