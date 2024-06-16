import React, { useState, useEffect } from 'react';
import { ToastMessage } from '../utils';
import { MealCard } from '../components';
  ;
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';
import LoadingSpinner from './LandingPage';

require('dotenv').config();

export const Home = () => {
    const [meals, setMeals] = useState([]);
    const [menuTab, setMenuTab] = useState('Appetizers')
    const [loading, setLoading] = useState(true)
    const handleMenuTabs = (type) => {
        setMenuTab(type)
    }

    const userAuth = useAuth()
    const {token, refresh, setToken, setRefresh} = userAuth

    const fetchMeals = async () => {
        ApiCall('meals', 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            const {status, data} = response
            if(status === 200){
                setMeals(data)
                setLoading(false)
            }else{
                throw new Error(response.data.error)
            }
        })
        .catch((error) => {
            ToastMessage(error.message? error.message: "An error occured")
        })
    };

    useEffect(() => {
        fetchMeals()
    }, []);

    return (
        <section className='flex flex-col justify-center w-full mt-2 lg:mt-0  pt-2 lg:pt-0 px-2 w-full md:px-3 lg:px-4 '>
               
            {
                loading? <LoadingSpinner />: 
            <div className='w-full h-full'>
                <div className=' w-full justify-around flex'>
                <div className="z-10000 fixed lg:relative flex items-center justify-center py-1 md:py-2 w-full lg:w-2/3 top-10 lg:top-0 bg-stone-700">
                    <p className={menuTab === 'Appetizers' ? "active_menu_tab text-xs md:text-base poppins bg-blue-500 px-1 py-1" : "menu_tab text-xs md:text-sm px-1 py-1 poppins "} onClick={() => handleMenuTabs('Appetizers')}>Appetizers</p>
                    <p className={menuTab === 'Main Courses' ? "active_menu_tab text-xs md:text-base poppins bg-blue-500 px-1 py-1" : "menu_tab text-xs md:text-sm px-1 py-1 poppins "} onClick={() => handleMenuTabs('Main Courses')}>Main Courses</p>
                    <p className={menuTab === 'Side Dishes' ? "active_menu_tab poppins text-xs md:text-base bg-blue-500 px-1 py-1" : "menu_tab text-xs md:text-sm px-1 py-1 poppins"} onClick={() => handleMenuTabs('Side Dishes')}>Side Dishes</p>
                    <p className={menuTab === 'Desserts' ? "active_menu_tab poppins text-xs md:text-base bg-blue-500 px-1 py-1" : "menu_tab text-xs md:text-sm px-1 py-1 poppins"} onClick={() => handleMenuTabs('Desserts')}>Desserts</p>
                    <p className={menuTab === 'Beverages' ? "active_menu_tab poppins text-xs md:text-base bg-blue-500 px-1 py-1" : "menu_tab text-xs md:text-sm px-1 py-1 poppins"} onClick={() => handleMenuTabs('Beverages')}>Beverages</p>
                </div>
                </div>
                <div className='flex flex-wrap mt-12 lg:mt-12 justify-around w-full'>
                {
            meals.filter((item) => menuTab !== ''? menuTab === item.category: item).length === 0? "No items under this category yet":
            meals.filter((item) => menuTab !== ''? menuTab === item.category: item).map((item) => (
                <MealCard key={item.meal_id} meal={item} />
            ))
                }
                </div>
            </div>

            }
        </section>
    );
};
