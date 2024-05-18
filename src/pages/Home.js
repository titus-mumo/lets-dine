import React, { useState, useEffect } from 'react';
import { ToastMessage } from '../utils';
import { MealCard } from '../components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';

require('dotenv').config();

export const Home = () => {
    const [meals, setMeals] = useState([]);

    const user = useAuth()
    const {token, refresh, setToken, setRefresh} = user

    const fetchMeals = async () => {
        ApiCall('meals', 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            const {status, data} = response
            if(status === 200){
                setMeals(data)
            }
        })
        .catch((error) => {
            return console.log(error)
        })
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    return (
        <section className='flex flex-col justify-center w-full'>
            <ToastContainer />
            <div className='m-10 flex flex-wrap justify-center'>
            <Link to='/cuisines' className='m-4 px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins '>View Cuisines</Link>
            <Link to='/reservations' className='m-4 px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins '>View Reservations made</Link>
            </div>
            <div className='flex flex-wrap mt-15 justify-around'>
            {
        meals.map((item) => (
            <MealCard key={item.meal_id} meal={item} />
        ))
            }
            </div>
        </section>
    );
};
