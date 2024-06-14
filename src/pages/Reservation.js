import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ToastMessage } from '../utils'
  
import 'react-toastify/dist/ReactToastify.css';
import { ApiCall } from '../hooks/ApiCall';
import { useAuth } from '../hooks/AuthProvider';
import moment from 'moment'
import LoadingSpinner from './LandingPage';
import { Call } from '@mui/icons-material';
import { LockClock } from '@mui/icons-material';

export const Reservation = () => {
    const user = useAuth()
    const {token, refresh, setToken, setRefresh} = user

    if(!token) return ToastMessage("error", "You are not autorised to perform this function")

    const [cuisineInfo, setCuisineInfo] = useState('')
    const [totatSeats, setTotalSeats] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(true)

    //useState(moment().format('YYYY-MM-DDTHH:mm:ss'));

    const {cuisine_id, contact, description,name, time_open, time_close} = cuisineInfo

    const params = useParams()

    const handleReservation = (e) => {
        e.preventDefault()
        if(totatSeats < 1 ){
            return ToastMessage("info", "Enter a valid number of seats")
        }
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
                setLoading(false)
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
    <div className='w-full flex flex-col justify-center lg:mt-0'>
           
        {
            loading? <LoadingSpinner /> :
            <div className='flex flex-col lg:flex-row mt-6 justify-around lg:mt-0 flex-wrap items-center w-full md:w-600px self-center px-2'>
            <div>
                <p className='poppins text-md font-medium text-center'>{name}</p>
                <p className='poppins text-sm'>{description}</p>
                <div className='flex items-center'>
                    <Call />
                    <p className='poppins text-sm ml-3'>{contact}</p>
                </div>
                <div className='flex items-center'>
                    <LockClock />
                    <p className='poppins text-sm ml-3'>{moment(time_open, "HH:mm:ss").format("hh:mm a")} - {moment(time_close, "HH:mm:ss").format("hh:mm a")}</p>
                </div>
                
            </div>
            <div>
            <div className="w-full bg-white rounded-lg shadow dark:border mt-3 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2 space-y-2 md:space-y-3 sm:p-4 ">
          <h1 className="poppins text-md md:text-lg font-medium leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Make reservation here
              </h1>
                    <form className='space-y-4 md:space-y-6' onSubmit={(e) => handleReservation(e)}>
                    <div>
                      <label htmlFor="seats" className="poppins block mb-1 text-xs md:text-sm font-medium text-gray-900 dark:text-white"> Total seats to be reserved</label>
                      <input type="number" name="seats" id="seats" value={totatSeats} onChange={(e) => setTotalSeats(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="no. of seats" required></input>
                    </div>
                    <div>
                      <label htmlFor="date" className="poppins block mb-1 text-xs md:text-sm font-medium text-gray-900 dark:text-white"> Date</label>
                      <input type="date" name="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="8:00 pm" required></input>
                    </div>
                    <div>
                      <label htmlFor="time" className="poppins block mb-1 text-xs md:text-sm font-medium text-gray-900 dark:text-white">Time</label>
                      <input type="time" name="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="8:00 pm" required></input>
                    </div>
                    <div className='flex flex-row justify-around'>
                        <div className='flex flex-center m-auto'>
                            <button className='m-2 poppins px-2 py-1.5 bg-blue-500 text-white text-sm ring-blue-400 focus:outline-none focus:ring-2 mt-3 rounded-lg transition duration-300'>Make reservation</button>
                        </div>
                        <div className='flex flex-center m-auto'>
                        <Link to='/cuisines' className='poppins m-2 px-2 py-1.5 bg-blue-500 text-sm  text-white ring-blue-400 focus:outline-none focus:ring-2 mt-3 rounded-lg transition duration-300 text-center'>Go Back</Link>
                        </div>
                </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
        }

    </div>
  )
}


