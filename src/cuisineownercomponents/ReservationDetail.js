import React, { useEffect, useState } from 'react'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'
import { ToastMessage } from '../utils'
import moment from 'moment'

export const ReservationDetail = ({reservation}) => {
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


    const handleDeleteReservation = (e)=> {
        e.preventDefault()
        ApiCall(`reservation/${reservation_id}/`, 'delete', token, refresh, setToken, setRefresh)
        .then(function(response){
            const {status, data} = response
            if(status === 200){
                ToastMessage("success", data.message)
                setTimeout(() => {window.location.reload()}, 5000)
                return;
            }
        })
        .catch((error) => {
            return ToastMessage("error", error.response.data["message"] || "Something went wrong")
        })
    }

    const handleEditReservation = (e) => {
        e.preventDefault()

    }
  return (
    <div className='flex w-full items-center justify-around shadow-md p-2 m-2 rounded-md'>
        <div className='m-auto'>
            {/* <p className='poppins text-lg font-semibold'>{cuisineName}</p> */}
            <p className='poppins text-sm'>{standardTime}</p>
            <p className='poppins text-sm'>Reserved seats: {total_seats}</p>
        </div>
        {/* <div className='basis-1/3 m-auto flex flex-col justify-start m-auto'>
        <button onClick={(e) => handleEditReservation(e)} className='m-2 px-2 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Edit Reservation</button>
        <button onClick={(e) => handleDeleteReservation(e)} className='m-2 px-2 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Delete Reservation</button>
        </div> */}
    </div>
  )
}
