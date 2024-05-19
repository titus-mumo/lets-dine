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
    const [menuTab, setMenuTab] = useState('bakeries')
    const handleMenuTabs = (type) => {
        setMenuTab(type)
    }

    const userAuth = useAuth()
    const {user, token, refresh, setToken, setRefresh} = userAuth

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
            <div className='flex flex-row justify-between px-3 shadow-md mt-2 mx-1 py-3 items-center rounded-md bg-gray-600 text-white'>
                <p className='poppins'>Welcome {user.username}</p>
                <Link to='/profile' className='poppins'>My Profile</Link>
            </div>
            <div className='m-10 flex flex-wrap justify-center'>
            <Link to='/cuisines' className='m-4 px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins '>View Cuisines</Link>
            <Link to='/reservations' className='m-4 px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins '>View Reservations made</Link>
            </div>
            <div className="flex items-center justify-center space-x-6 my-4">
            <p className={menuTab === '' ? "active_menu_tab poppins bg-primary" : "menu_tab poppins"} onClick={() => handleMenuTabs('')}>All</p>
                <p className={menuTab === 'bakeries' ? "active_menu_tab poppins bg-primary" : "menu_tab poppins"} onClick={() => handleMenuTabs('bakeries')}>Bakeries</p>
                <p className={menuTab === 'groceries' ? "active_menu_tab poppins bg-primary" : "menu_tab poppins"} onClick={() => handleMenuTabs('groceries')}>Groceries</p>
                <p className={menuTab === 'diningout' ? "active_menu_tab poppins bg-primary" : "menu_tab poppins"} onClick={() => handleMenuTabs('diningout')}>Dining Out</p>
            </div>
            <div className='flex flex-wrap mt-15 justify-around'>
            {
        meals.filter((item) => menuTab !== ''? menuTab === item.category: item).map((item) => (
            <MealCard key={item.meal_id} meal={item} />
        ))
            }
            </div>
        </section>
    );
};
