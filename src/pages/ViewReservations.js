import React, { useEffect, useState } from 'react'
import { ToastMessage } from '../utils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ApiCall } from '../hooks/ApiCall';
import { useAuth } from '../hooks/AuthProvider';
import { ReservatinDetail } from '../components/ReservatinDetail';
import { Link } from 'react-router-dom';

export const ViewReservations = () => {

    const [userReservations, setUserReservations] = useState([])

    const user = useAuth()
    const {token, refresh, setToken, setRefresh} = user

    if(!token) return ToastMessage("error", "Ooops! You are not logged in")

    const fetchUserSpecificReservations = () => {
        ApiCall('reservation/user', 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            const {status, data} = response
            if(status === 200){
                console.log(data)
                setUserReservations(data)
            }
        })
        .catch((error) => {
            return console.log(error.message)
        })
    }

    useEffect(() => {
        fetchUserSpecificReservations()
    }, [])

  return (
    <div className='flex flex-col jusfity-around w-auto h-screen'>
        <p className='font-bold text-3xl poppins'>Reservations Made</p>
        {
            userReservations.length > 0? (userReservations.map((item) => <ReservatinDetail key={item.reservation_id} reservation={item} />)) :
            (<p className='poppins my-20'>Reservations made will appear here</p>)
        }
        <Link to='/home' className='m-auto px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Go back home</Link>
    </div>
  )
}
