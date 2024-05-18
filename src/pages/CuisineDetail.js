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
    const {token, refresh, setToken} = user

    const [cuisineMenu, setCuisineMenu] = useState([])
    const [cuisineInfo, setCuisineInfo] = useState('')

    const {cuisine_id, contact, description,name, time_open} = cuisineInfo

    const fetchCuisineMenu = async() => {
        ApiCall(`cuisines/${params.cuisine_id}/menu`, 'get', token, refresh, setToken)
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
        ApiCall(`cuisines/${params.cuisine_id}/`, 'get', token, refresh, setToken)
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
        <div>
            <p>Cusine Info</p>
            <p>{name}</p>
            <p>{description}</p>
            <p>{contact}</p>
            <p>{time_open}</p>
        </div>
        <div>
            <p>Menu</p>
            {
                cuisineMenu.map(item => <MealCard key={item.meal_id} meal={item}/>)
            }
        </div>
        <div>
            <Link to='/cuisines'>Back</Link>
        </div>
    </div>
  )
}
