import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { ToastMessage } from '../../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MealCard } from '../../cuisineownercomponents';
import { useAuth } from '../../hooks/AuthProvider';
import { ApiCall } from '../../hooks/ApiCall';
import { ReviewCard } from '../../cuisineownercomponents';

export const CuisineMenu = () => {
    
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
            return ToastMessage("error", "Something went wrong")
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
            return []
        });
    }

    useEffect(() => {
        fetchCuisineMenu()
        fetchCuisineInfo()
    }, [params.cuisine_id])
  return (
    <div className='flex flex-col justify-around w-full mt-9'>
        <ToastContainer />
        <div className='mb-10 flex justify-center w-full flex-col'>
            <p className='pppins font-bold text-3xl text-center'>{name}</p>
            <p className='poppins text-center'>{description}</p>
            <p className='popins text-center'>{contact}</p>
            <p className='poppins text-center'>{time_open}</p>
        </div>
        <div className='mt-10 flex justify-center w-full flex-row'>
        <Link to={`/cuisine-owner/${cuisine_id}/menu/add`} className='m-4 px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Add Item</Link>
            <Link to='/cuisine-owner/home' className='m-4 px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Back</Link>
        </div>
        <div className='flex justify-around w-full flex-col'>
            <div className='flex flex-wrap justify-around'>
            {
                cuisineMenu.length === 0? "No menu for this cuisine yet" : cuisineMenu.map(item => <MealCard key={item.meal_id} meal={item}/>)
            }
            </div>
        </div>
        <div className='flex justify-around w-full flex-col'>
            <ReviewCard cuisine_id={params.cuisine_id}/>
        </div>

    </div>
  )
}

