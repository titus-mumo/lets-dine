import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ToastMessage } from '../utils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from'axios'
import { ApiCall } from '../hooks/ApiCall';
import { useAuth } from '../hooks/AuthProvider';
import moment from 'moment'

require('dotenv').config()

export const Reservation = () => {

    const user = useAuth()
    const {token, refresh, setToken} = user

    if(!token) return ToastMessage("error", "You are not autorised to perform this function")

    const [cuisineInfo, setCuisineInfo] = useState('')
    const [totatSeats, setTotalSeats] = useState(0)
    const [time, setTime] = useState(moment().format('YYYY-MM-DDTHH:mm:ss'));

    const {cuisine_id, contact, description,name, time_open} = cuisineInfo

    const params = useParams()

    const handleReservation = (e) => {
        e.preventDefault()
        const data = {
                cuisine: cuisine_id,
                total_seats: totatSeats,
                time: time,
            }
        ApiCall(`reservation/user/`, 'post', token, refresh, setToken,data)
        .then(function(response){
            const {status, data} = response
            if(status === 201){
                return ToastMessage("success", "Reservation made successfully")
            }
        })
        .catch((error) => {
            return console.log(error)
        })

    }
    const fetchCuisineInfo = async() => {
        ApiCall(`cuisines/${params.cuisine_id}/`, 'get', token, refresh, setToken)
        .then(function(response){
            const {data, status} = response
            if(status === 200){
                console.log(data)
                setCuisineInfo(data)
            }
        })
        .catch((error) => {
            return console.log(error)
        })
    }
    useEffect(() => {
        fetchCuisineInfo();
    }, [])
  return (
    <div>
        <ToastContainer />
        <div>
            Cuisine Info
            <p>{name}</p>
            <p>{description}</p>
            <p>{contact}</p>
            <p>{time_open}</p>
        </div>
        <div>
            <form>

            </form>
        </div>
        <div>
            <span onClick={(e) => handleReservation(e)}>Make reservation</span>
            <Link to='/cuisines'>Go Back</Link>
        </div>
    </div>
  )
}
