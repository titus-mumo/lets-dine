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
    const {token, refresh, setToken} = user

    const fetchMeals = async () => {
        ApiCall('meals', 'get', token, refresh, setToken)
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
        <section>
            <ToastContainer />
            {
        meals.map((item) => (
            <MealCard key={item.meal_id} meal={item} />
        ))
            }
            <Link to='/cuisines'>View Cuisines</Link>
            <Link to='/reservations'>View Reservations made</Link>
        </section>
    );
};
