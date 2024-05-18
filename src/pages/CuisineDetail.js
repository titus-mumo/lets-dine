import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ToastMessage } from '../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MealCard } from '../components';
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';

require('dotenv').config()

export const CuisineDetail = () => {
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
            return ToastMessage("error", "Something wnt wrong")
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
            return ToastMessage("error", "Something went wrong")
        });
    }


    const params = useParams();
    useEffect(() => {
        fetchCuisineMenu()
        fetchCuisineInfo()
    }, [params.cuisine_id])
  return (
    <div>
        <ToastContainer />
        <div className='mb-10'>
            <p className='poppins'>Cuisine Info</p>
            <p className='pppins font-bold text-3xl'>{name}</p>
            <p className='poppins'>{description}</p>
            <p className='popins'>{contact}</p>
            <p className='poppins'>{time_open}</p>
        </div>
        <div>
            <p>Menu</p>
            <div className='flex flex-wrap justify-around'>
            {
                cuisineMenu.map(item => <MealCard key={item.meal_id} meal={item}/>)
            }
            </div>
        </div>
        <div className='mt-10'>
        <Link to='/cuisine/menu/add' className='px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Add Item</Link>
            <Link to='/cuisines' className='px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Back</Link>
        </div>
    </div>
  )
}
