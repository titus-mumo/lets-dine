import React, { useEffect, useState } from 'react'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'
import { ReservationDetail } from './ReservationDetail'
import LoadingSpinner from '../pages/LandingPage'
import { ToastMessage } from '../utils'

export const ReservationsSection = ({cuisine_id}) => {
  const userAuth = useAuth()
  const {token, refresh, setToken, setRefresh} = userAuth

  const [reservationList, setReservationList] = useState([])
  const [loading, setLoading] = useState(true)

  const handleFetchCuisineSpecificReservations = () => {
    ApiCall(`reservation/cuisine/${cuisine_id}`, 'get', token, refresh, setToken, setRefresh)
    .then(function(response){
      if(response.status === 200 && response.data.length > 0){
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sortedData = response.data
        .filter(item => new Date(item.time) >= today)
        .sort((a, b) => new Date(a.time) - new Date(b.time));
        setReservationList(sortedData)
        setLoading(false)
        return
      }else if (response.status === 200 && response.data.length === 0){
        setReservationList([])
        setLoading(false)
        return
      } 
      throw new Error(response.data.error)

    })
    .catch((error) => {
      return ToastMessage("error", error.message? error.message || "Something went wrong": "something went wrong")
    });
  }

  useEffect(() => {
    console.log(cuisine_id)
    handleFetchCuisineSpecificReservations()
  }, [cuisine_id])
  return (
    <div className={`${reservationList? 'block overflow-x-hidden': ''}  p-2 m-2`}>
      {
        loading? <LoadingSpinner />: reservationList.length === 0?<p className='text-sm'>Cuisine reservations made will appear here</p> :reservationList.map((item) => <ReservationDetail key={item.reservation_id} reservation={item}/>)
      }
    </div>
  )
}
