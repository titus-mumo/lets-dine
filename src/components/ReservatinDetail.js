import React, { useEffect, useState } from 'react'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'
import { ToastMessage } from '../utils'
import moment from 'moment'

export const ReservatinDetail = ({reservation}) => {
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
        //TODO: Include cnfirmation pop-up
        e.preventDefault()
        ApiCall(`reservation/delete/${reservation_id}/`, 'delete', token, refresh, setToken, setRefresh)
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
        //TODO: Review edit function

    }
  return (
    <div className='flex w-full items-center justify-between shadow-md p-2 m-2 rounded-md'>
        <div className='basis-2/3 m-auto flex flex-col justify-start ml-2 '>
            <p className='poppins text-left md:text-lg md:font-semibold text-md font-medium'>{cuisineName}</p>
            <p className='poppins text-left  text-sm md:text-base'>{standardTime}</p>
            <p className='poppins text-left text-sm md:text-base'>Reserved seats: {total_seats}</p>
        </div>
        <div className='basis-1/3 flex justify-between  m-auto'>
            <div className='flex items-center justify-center m-auto'>
            <button onClick={(e) => handleEditReservation(e)} className='w-full px-3 py-2 bg-green-600 text-white ring-green-400 focus:outline-none focus:ring-4 mt-2 rounded-lg transition duration-300 poppins text-xs md:text-sm'>Edit</button>
            </div>
            <div className=' flex justify-center items-center m-auto'>
            <button onClick={(e) => handleDeleteReservation(e)} className='w-full px-3 py-2 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-2 rounded-lg transition duration-300 poppins md:text-sm text-xs'>Delete</button>
            </div>
        </div>
    </div>
  )
}
