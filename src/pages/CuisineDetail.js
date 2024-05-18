import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ToastMessage } from '../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { MealCard } from '../components';

require('dotenv').config()

export const CuisineDetail = () => {

    const [cuisineMenu, setCuisineMenu] = useState([])
    const [cuisineInfo, setCuisineInfo] = useState('')

    const {cuisine_id, contact, description,name, time_open} = cuisineInfo


    const params = useParams();
    useEffect(() => {
        const fetchCuisineMenu = async() => {
            try {
                const response = await axios.get(process.env.BASE_URL + `cuisines/${params.cuisine_id}/menu/`)
                setCuisineMenu(response.data)
            } catch (error) {
                ToastMessage("error", "Something went wrong")
            }
        }
        const fetchCuisineInfo = async() => {
            try {
                const response = await axios.get(process.env.BASE_URL + `cuisines/${params.cuisine_id}/`)
                setCuisineInfo(response.data)
            } catch (error) {
                ToastMessage("error", "Something went wrong")
            }
        }
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
