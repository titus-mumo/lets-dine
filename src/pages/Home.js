import React, { useState, useEffect } from 'react';
import { ToastMessage } from '../utils';
import { MealCard } from '../components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';
import LogoutIcon from '@mui/icons-material/Logout';
import { CuisineTabs } from '../cuisineownercomponents';

require('dotenv').config();

export const Home = () => {
    const [meals, setMeals] = useState([]);
    const [menuTab, setMenuTab] = useState('')
    const [isHovered, setIsHovered] = useState(true)
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
        <section className='flex flex-col justify-center w-full mt-2 lg:mt-0  pt-2 lg:pt-0 px-2 w-full md:px-3 lg:px-4 '>
            <ToastContainer />
            {/* lg:fixed left-70 z-100000 top-1 right-1  */}
            {/* TODO: Add fix position to header */}
            {/* <div className='hidden w-full lg:flex flex-row justify-between px-3 shadow-md mt-2 lg:mt-0 mx-1 py-3 items-center rounded-md bg-gray-600 text-white'>
                <p className='poppins'>Welcome {user.username}</p>
                <div className='hover:cursor-pointer' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <LogoutIcon />
                </div>
            </div> */}
            <CuisineTabs />
            <div className=' w-full justify-around flex'>
            <div className="z-10000 fixed lg:relative flex items-center justify-center py-2 w-full lg:w-2/3 top-10 lg:top-0 rounded-md bg-slate-900">
                <p className={menuTab === '' ? "active_menu_tab poppins bg-primary px-2 py-1" : "menu_tab px-2 py-1 poppins "} onClick={() => handleMenuTabs('')}>All</p>
                <p className={menuTab === 'bakeries' ? "active_menu_tab poppins bg-primary px-2 py-1" : "menu_tab px-2 py-1 poppins "} onClick={() => handleMenuTabs('bakeries')}>Bakeries</p>
                <p className={menuTab === 'groceries' ? "active_menu_tab poppins bg-primary px-2 py-1" : "menu_tab px-2 py-1 poppins"} onClick={() => handleMenuTabs('groceries')}>Groceries</p>
                <p className={menuTab === 'diningout' ? "active_menu_tab poppins bg-primary px-2 py-1" : "menu_tab px-2 py-1 poppins"} onClick={() => handleMenuTabs('diningout')}>Dining Out</p>
            </div>
            </div>
            <div className='flex flex-wrap mt-12 lg:mt-12 justify-around w-full'>
            {
        meals.filter((item) => menuTab !== ''? menuTab === item.category: item).map((item) => (
            <MealCard key={item.meal_id} meal={item} />
        ))
            }
            </div>
        </section>
    );
};
