import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ToastMessage } from '../utils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ApiCall } from '../hooks/ApiCall';
import { useAuth } from '../hooks/AuthProvider';
import moment from 'moment'

export const Reservation = () => {

    const user = useAuth()
    const {token, refresh, setToken, setRefresh} = user

    if(!token) return ToastMessage("error", "You are not autorised to perform this function")

    const [cuisineInfo, setCuisineInfo] = useState('')
    const [totatSeats, setTotalSeats] = useState(1)
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')

    //useState(moment().format('YYYY-MM-DDTHH:mm:ss'));

    const {cuisine_id, contact, description,name, time_open} = cuisineInfo

    const params = useParams()

    const handleReservation = (e) => {
        e.preventDefault()
        const dateTimeString = `${date} ${time}`;
        const dateTime = moment(dateTimeString, 'YYYY-MM-DD HH:mm').toISOString();
        const data = {
                cuisine: cuisine_id,
                total_seats: totatSeats,
                time: dateTime,
            }
        ApiCall(`reservation/user/`, 'post', token, refresh, setToken, setRefresh, data)
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
        ApiCall(`cuisines/${params.cuisine_id}/`, 'get', token, refresh, setToken,setRefresh)
        .then(function(response){
            const {data, status} = response
            if(status === 200){
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
        <div className='h-screen flex flex-col lg:flex-row justify-around flex-wrap items-center'>
            <div>
                <p className='poppins'>{name}</p>
                <p className='poppins'>{description}</p>
                <p className='poppins'>{contact}</p>
                <p className='poppins'>{time_open}</p>
            </div>
            <div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="poppins text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Make reservation here
              </h1>
                    <form className='space-y-4 md:space-y-6' onSubmit={(e) => handleReservation(e)}>
                    <div>
                      <label htmlFor="seats" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Total seats to be reserved</label>
                      <input type="number" name="seats" id="seats" value={totatSeats} onChange={(e) => setTotalSeats(e.target.value >= 1? e.target.value: totatSeats)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Total seats" required></input>
                    </div>
                    <div>
                      <label htmlFor="date" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Date</label>
                      <input type="date" name="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="8:00 pm" required></input>
                    </div>
                    <div>
                      <label htmlFor="time" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                      <input type="time" name="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="8:00 pm" required></input>
                    </div>
                    <div className='flex flex-col md:flex-row justify-around'>
                    <button className='m-4 poppins px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300'>Make reservation</button>
                    <Link to='/cuisines' className='poppins m-4 px-4 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300'>Go Back</Link>
                </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
