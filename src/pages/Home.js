import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastMessage } from '../utils';
import { MealCard } from '../components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

require('dotenv').config();

export const Home = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get(process.env.BASE_URL + 'meals');
                setMeals(response.data);
                console.log(response.data); // Log fetched data
            } catch (error) {
                ToastMessage("error", "Something went wrong");
            }
        };

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
