import React, { useEffect, useState } from 'react'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'
import { ReservationDetail } from './ReservationDetail'

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
        //.filter(item => new Date(item.time) >= today)
        .sort((a, b) => new Date(a.time) - new Date(b.time));
        setReservationList(sortedData)
      }else{
        console.log("An error occured")
      }
      setLoading(false)
    })
    .catch((error) => {
      return console.log("An error occured")
    })
  }

  useEffect(() => {
    handleFetchCuisineSpecificReservations()
  }, [cuisine_id])
  return (
    <div className='block overflow-x-hidden p-2 m-2'>
      {
        loading? 'Loading': reservationList.length === 0? 'Cuisine Reservations made will appear here':reservationList.map((item) => <ReservationDetail key={item.reservation_id} reservation={item}/>)
      }
    </div>
  )
}
