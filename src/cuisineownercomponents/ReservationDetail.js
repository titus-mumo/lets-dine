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
        })
        .catch((error) => {
            //TODO
            return console.log("An error occured")
        })
    }

    useEffect(() => {
        fetchCuisineDetail()
    }, [cuisine])

  return (
    <div className='flex w-full items-center justify-around shadow-md p-2 m-2 rounded-md'>
        <div className='m-auto'>
            {/* <p className='poppins text-lg font-semibold'>{cuisineName}</p> */}
            <p className='poppins text-sm'>{standardTime}</p>
            <p className='poppins text-sm'>Reserved seats: {total_seats}</p>
        </div>
    </div>
  )
}
