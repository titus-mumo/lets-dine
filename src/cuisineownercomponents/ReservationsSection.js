import React, { useEffect, useState } from 'react'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'

export const ReservationsSection = ({cuisine_id}) => {
  console.log(cuisine_id)
  const userAuth = useAuth()
  const {token, refresh, setToken, setRefresh} = userAuth

  const [reservationList, setReservationList] = useState([])
  const [loading, setLoading] = useState(true)

  const handleFetchCuisineSpecificReservations = () => {
    ApiCall(`reservation/cuisine/${cuisine_id}`, 'get', token, refresh, setToken, setRefresh)
    .then(function(response){
      if(response.status === 200){
        setReservationList(response.data)
        setLoading(false)
      }else{
        return console.log("An error occured")
      }
    })
    .catch((error) => {
      return console.log("An error occured")
    })
  }

  useEffect(() => {
    handleFetchCuisineSpecificReservations()
  }, [cuisine_id])
  return (
    <div>
      {
        loading? 'Loading': reservationList.length === 0? 'Cuisine Reservations will appear here':reservationList.map((item) => <p>{item.total_seats}</p>)
      }
    </div>
  )
}
