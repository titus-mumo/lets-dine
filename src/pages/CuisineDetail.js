import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastMessage } from '../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MealCard, SeeReviewCard } from '../components';
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';

export const CuisineDetail = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = useParams(location.pathname);

    const user = useAuth()
    const {token, refresh, setToken, setRefresh} = user

    const [cuisineMenu, setCuisineMenu] = useState([])
    const [cuisineInfo, setCuisineInfo] = useState('')

    const {cuisine_id, contact, description,name, time_open} = cuisineInfo

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
            }
        })
        .catch((error) => {
            
        });
    }

    useEffect(() => {
        fetchCuisineMenu()
        fetchCuisineInfo()
    }, [params.cuisine_id])
  return (
    <div className='mt-10 lg:mt-0 flex flex-col justify-center w-full self-center'>
        <div className='flex flex-col justify-center w-full lg:w-900px self-center'>
            <ToastContainer />
            <div className='mb-1 flex flex-col justify-center w-full'>
                <p className='pppins font-bold text-3xl text-center'>{name}</p>
                <p className='poppins text-center'>{description}</p>
                <p className='popins text-center'>{contact}</p>
                <p className='poppins text-center'>{time_open}</p>
            </div>
            <div className='flex justify-around w-full'>
            <Link to={`/cuisine/${cuisine_id}/menu/add`} className='mx-1 px-3 py-1 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 rounded-lg transition duration-300 poppins'>Add Item</Link>
                <Link to='/cuisines' className='mx-1 px-3 py-1 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 rounded-lg transition duration-300 poppins'>Back</Link>
            </div>
            <div className='mt-3'>
                <div className='flex flex-wrap justify-around'>
                {
                    cuisineMenu.map(item => <MealCard key={item.meal_id} meal={item}/>)
                }
                </div>
            </div>
            <div className='my-2'>
                <SeeReviewCard cuisine_id = {cuisine_id}/>
            </div>
        </div>
    </div>
  )
}
