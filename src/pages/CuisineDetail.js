import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastMessage } from '../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MealCard, SeeReviewCard } from '../components';
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';
import { AddReview } from './AddReview';
import LoadingSpinner from './LandingPage';
import { LockClock } from '@mui/icons-material';
import { Call, LocationOnOutlined } from '@mui/icons-material';
import moment from 'moment';

export const CuisineDetail = () => {
    const location = useLocation();
    const params = useParams(location.pathname);
    const [addReview, setAddReview] = useState(false)
    const [loading, setLoading] = useState(true)

    const user = useAuth()
    const {token, refresh, setToken, setRefresh} = user

    const [cuisineMenu, setCuisineMenu] = useState([])
    const [cuisineInfo, setCuisineInfo] = useState('')

    const {cuisine_id, contact, description,name, time_open, time_close} = cuisineInfo

    const fetchCuisineMenu = async() => {
        ApiCall(`cuisines/${params.cuisine_id}/menu`, 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            const {status, data} = response
            if(status === 200){
                setCuisineMenu(data)
            }
        })
        .catch((error) => {
            console.log('error')
        });
    }
    const fetchCuisineInfo = async() => {
        ApiCall(`cuisines/${params.cuisine_id}/`, 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            const {status, data} = response
            if (status === 200) {
                setCuisineInfo(data)
                setLoading(false)
            }
        })
        .catch((error) => {
            
        });
    }

    useEffect(() => {
        fetchCuisineMenu()
        fetchCuisineInfo()
    }, [params.cuisine_id])

    const handleAddReview = (e) => {
        e.preventDefault()
        setAddReview(true)
    }
  return (
    <div className='mt-10 lg:mt-0 flex flex-col justify-center w-full self-center'>
        {
            loading? <LoadingSpinner />:
            <div className='flex flex-col justify-center w-full lg:w-900px self-center px-1.5'>
            <div className='mb-1 flex flex-col justify-center w-full'>
                <p className='poppins font-medium text-md md:text-lg text-center'>{name}</p>
                <p className='poppins text-left text-sm md:text-md'>{description}</p>
                <div className='flex flex-col justify-start self-center w-250px md:w-300px'>
                    <div className='flex items-center'>
                        <LocationOnOutlined />
                        <p className='popins text-center ml-3 text-sm'>{cuisineInfo.location}</p>
                    </div>
                    <div className='flex items-center'>
                        <Call />
                        <p className='popins text-center ml-3 text-sm'>{contact}</p>
                    </div>
                    <div className='flex items-center'>
                        <LockClock />
                        <p className='poppins text-center ml-3 text-sm'>{moment(time_open, "HH:mm:ss").format("HH:mm")} - {moment(time_close, "HH:mm:ss").format("HH:mm")}</p>
                    </div>
                </div>

            </div>
            <div className='flex justify-around w-full'>
            <Link to={`/cuisine/${cuisine_id}/menu/add`} className='mx-1 px-3 py-1 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 rounded-lg transition duration-300 poppins text-md'>Add Item</Link>
                <Link to='/cuisines' className='mx-1 px-3 py-1 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 rounded-lg transition duration-300 poppins text-md'>Back</Link>
            </div>
            <div className='mt-3'>
                <div className='flex flex-wrap justify-start md:justify-around'>
                {
                    cuisineMenu.length === 0? <p className='text-sm md:text-md'>No items on the menu yet</p>:cuisineMenu.map(item => <MealCard key={item.meal_id} meal={item}/>)
                }
                </div>
            </div>
            <div className='my-2'>
                <SeeReviewCard cuisine_id = {cuisine_id}/>
            </div>
            <div className='my-3 w-full flex justify-center'>
                {
                    addReview? <AddReview name={name} setAddReview={setAddReview}/>:
                    <button onClick={(e)=> handleAddReview(e)} className='m-1 px-3 py-1 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 mt-2 rounded-lg transition duration-300 poppins'>Add Review</button>

                }
            </div>
        </div>
        }
    </div>
  )
}
