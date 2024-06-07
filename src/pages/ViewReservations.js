import React, { useEffect, useState } from 'react'
import { ToastMessage } from '../utils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ApiCall } from '../hooks/ApiCall';
import { useAuth } from '../hooks/AuthProvider';
import { ReservatinDetail } from '../components/ReservatinDetail';
import { Link } from 'react-router-dom';
import { CuisineTabs } from '../cuisineownercomponents';

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
        <div className='flex flex-col justify-center self-start w-full mt-10 lg:mt-0 pt-2 lg:pt-0 px-2 w-full md:px-3 lg:px-4 '>
            <div className='flex flex-col justify-center items-center w-full'>
                <p className='font-bold text-md md:text-lg poppins text-center'>Reservations Made</p>
                <div className='overflow-y-auto overflow-x-hidden w-full md:w-5/6 lg:h-600px lg:w-700px text-center'>
                    {userReservations.length > 0 ? (
                        userReservations.map((item) => 
                            <ReservatinDetail key={item.reservation_id} reservation={item} />
                        )
                    ) : (
                        <p className='poppins my-20'>Reservations made will appear here</p>
                    )}
                </div>
                <Link to='/home' className='m-auto px-3 py-1.5 md:py-2 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-1 mt-3 rounded-lg transition duration-300 poppins'>Go back home</Link>
            </div>
        </div>

  )
}
