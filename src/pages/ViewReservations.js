import React, { useEffect, useState } from 'react'
import { ToastMessage } from '../utils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ApiCall } from '../hooks/ApiCall';
import { useAuth } from '../hooks/AuthProvider';
import { ReservatinDetail } from '../components/ReservatinDetail';

export const ViewReservations = () => {

    const [userReservations, setUserReservations] = useState([])

    const user = useAuth()
    const {token} = user

    if(!token) return ToastMessage("error", "Ooops! You are not logged in")

    const fetchUserSpecificReservations = () => {
        ApiCall('reservation/user', 'get', token)
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
    <div>
        <p>ViewReservations</p>
        {
            userReservations.map((item) => <ReservatinDetail key={item.reservation_id} reservation={item} />)
        }
    </div>
  )
}
