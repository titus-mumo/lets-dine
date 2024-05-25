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
        <div className='flex flex-col justify-center self-start w-full h-screen mt-9 lg:mt-0'>
            <div className='flex flex-col justify-center items-center w-full'>
                <p className='font-bold text-3xl poppins text-center'>Reservations Made</p>
                <div className='overflow-y-auto overflow-x-hidden w-6/7 md:w-5/6 lg:h-600px lg:w-700px text-center'>
                    {userReservations.length > 0 ? (
                        userReservations.map((item) => 
                            <ReservatinDetail key={item.reservation_id} reservation={item} />
                        )
                    ) : (
                        <p className='poppins my-20'>Reservations made will appear here</p>
                    )}
                </div>
                <Link to='/home' className='m-auto px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Go back home</Link>
            </div>
        </div>

  )
}
