import React, { useEffect, useState } from 'react'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'
import { ToastMessage } from '../utils'

export const ReservatinDetail = ({reservation}) => {
    const {reservation_id, cuisine, total_seats, time } = reservation
    const user = useAuth()

    const [cuisineName, setCuisineName] = useState('')

    const {token, refresh, setToken} = user

    if(!token) return ToastMessage("error", "Ooops! You are not logged in")

    const fetchCuisineDetail = () => {
        ApiCall(`cuisines/${cuisine}`, 'get', token, refresh, setToken)
        .then(function(response){
            const {data, status} = response
            if(status === 200){
                const {name} = data
                setCuisineName(name)
                return;
            }

            throw new Error(response)
        })
        .catch((error) => {
            return console.log(error)
        })
    }

    useEffect(() => {
        fetchCuisineDetail()
    }, [cuisine])


    const handleDeleteReservation = (e)=> {
        e.preventDefault()
    }
  return (
    <div>
        <p>{cuisineName}</p>
        <p>{time}</p>
        <p>{total_seats}</p>
        <button onClick={(e) => handleDeleteReservation(e)}>Delete Reservation</button>
    </div>
  )
}
