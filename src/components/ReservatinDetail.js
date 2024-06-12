import React, { useEffect, useState } from 'react'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'
import { ToastMessage } from '../utils'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

export const ReservatinDetail = ({reservation, setReservationId, setConfirmDelete, reservationId}) => {
    const {reservation_id, cuisine, total_seats, time } = reservation
    const standardTime = moment(time).format('MMMM Do YYYY, h:mm a');
    const user = useAuth()

    const [cuisineName, setCuisineName] = useState('')

    const {token, refresh, setToken, setRefresh} = user

    if(!token) return ToastMessage("error", "Ooops! You are not logged in")

    const fetchCuisineDetail = () => {
        ApiCall(`cuisines/${cuisine}`, 'get', token, refresh, setToken, setRefresh)
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

    const navigate = useNavigate()

    const handleEditReservation = (e) => {
        e.preventDefault()
        
        navigate('/reservation/edit', {state : {reservation: reservation}})
        

    }

    const handleDeleteReservation = (e) => {
        e.preventDefault()
        setConfirmDelete(true)
        setReservationId(reservation_id)

    }
  return (
    <div className={`flex w-full items-center justify-between shadow-md p-1 my-1 rounded-md ${reservationId === reservation_id? "bg-gray-200": ""}`}>
        <div className='basis-2/3 m-auto flex flex-col justify-start ml-2 '>
            <p className='poppins text-left md:text-lg md:font-semibold text-md font-medium'>{cuisineName}</p>
            <p className='poppins text-left  text-sm md:text-base'>{standardTime}</p>
            <p className='poppins text-left text-sm md:text-base'>Reserved seats: {total_seats}</p>
        </div>
        <div className='basis-1/3 flex justify-between  m-auto'>
            <div className='flex items-center justify-center m-auto'>
            <button onClick={(e) => handleEditReservation(e)} className='w-full px-3 py-2 bg-green-600 text-white ring-green-400 focus:outline-none focus:ring-2 mt-2 rounded-lg transition duration-300 poppins text-xs md:text-sm'>Edit</button>
            </div>
            <div className=' flex justify-center items-center m-auto'>
            <button onClick={(e) => handleDeleteReservation(e)} className='w-full px-3 py-2 bg-primary text-white ring-red-400 focus:outline-none focus:ring-2 mt-2 rounded-lg transition duration-300 poppins md:text-sm text-xs'>Delete</button>
            </div>
        </div>
    </div>
  )
}
