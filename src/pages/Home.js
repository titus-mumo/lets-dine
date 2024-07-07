import React, { useState, useEffect } from 'react';
import { ToastMessage } from '../utils';
import { MealCard } from '../components';
  ;
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';
import LoadingSpinner from './LandingPage';
import { usePreferenceList } from '../hooks/UserPreferenceProvider';

require('dotenv').config();

export const Home = () => {
    const [meals, setMeals] = useState([]);
    const [menuTab, setMenuTab] = useState(sessionStorage.getItem("menutab") || 'Appetizers')
    const [loading, setLoading] = useState(true)
    useEffect(() => {

      let key = foodType.indexOf(menuTab)
      if(filterList[key] === false || filterList[key] === 'false'){
        const trueId = []
        filterList.map((item, index) => item === true? trueId.push(index): '')
        handleMenuTabs(foodType[trueId[0]])
      }
    },[])
    const handleMenuTabs = (type) => {
        setMenuTab(type)
        sessionStorage.setItem("menutab", type)
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


    const usePreferences = usePreferenceList()
    const {
      appetizers,
      mainCourses,
      sideDishes,
      desserts,
      beverages,
    } = usePreferences

    const filterList = [appetizers, mainCourses, sideDishes,desserts, beverages]

    const foodType = ['Appetizers', 'Main Courses', 'Side Dishes', 'Desserts', 'Beverages']

    const [rateFood, setRateFood] = useState('')
    const [rateNumber, setRateNumber] = useState('')
    const [clickedId, setClickedId] = useState('') 

    return (
        <section className='flex flex-col justify-center w-full mt-2 lg:mt-0  pt-2 lg:pt-0 px-2 w-full md:px-3 lg:px-4 '>
               
            {
                loading? <LoadingSpinner />: 
            <div className='w-full h-full'>
                <div className=' w-full justify-around flex'>
                <div className="z-10000 fixed lg:relative flex items-center justify-center py-1 md:py-2 w-full lg:w-2/3 top-10 lg:top-0 bg-stone-700">
                    <p className={appetizers === false || appetizers === 'false'? 'hidden': menuTab === 'Appetizers' ? "active_menu_tab text-xs md:text-base poppins bg-blue-500 px-1 py-1" : "menu_tab text-xs md:text-sm px-1 py-1 poppins "} onClick={() => handleMenuTabs('Appetizers')}>Appetizers</p>
                    <p className={menuTab === 'Main Courses' ? "active_menu_tab text-xs md:text-base poppins bg-blue-500 px-1 py-1" : "menu_tab text-xs md:text-sm px-1 py-1 poppins "} onClick={() => handleMenuTabs('Main Courses')}>Main Courses</p>
                    <p className={sideDishes === false || sideDishes === 'false'? 'hidden': menuTab === 'Side Dishes' ? "active_menu_tab poppins text-xs md:text-base bg-blue-500 px-1 py-1" : "menu_tab text-xs md:text-sm px-1 py-1 poppins"} onClick={() => handleMenuTabs('Side Dishes')}>Side Dishes</p>
                    <p className={desserts === false || desserts === 'false'? 'hidden': menuTab === 'Desserts' ? "active_menu_tab poppins text-xs md:text-base bg-blue-500 px-1 py-1" : "menu_tab text-xs md:text-sm px-1 py-1 poppins"} onClick={() => handleMenuTabs('Desserts')}>Desserts</p>
                    <p className={beverages === false || beverages === 'false'? 'hidden': menuTab === 'Beverages' ? "active_menu_tab poppins text-xs md:text-base bg-blue-500 px-1 py-1" : "menu_tab text-xs md:text-sm px-1 py-1 poppins"} onClick={() => handleMenuTabs('Beverages')}>Beverages</p>
                </div>
                <RateContainer rateFood={rateFood} setRateFood={setRateFood} clickedId={clickedId} setClickedId={setClickedId} rateNumber={rateNumber} setRateNumber={setRateNumber}  />
                </div>
                <div className='flex flex-wrap mt-12 lg:mt-12 justify-around w-full'>
                {
            meals.filter((item) => menuTab !== ''? menuTab === item.category: item).length === 0? "No items under this category yet":
            meals.filter((item) => menuTab !== ''? menuTab === item.category: item).map((item) => (
                <MealCard key={item.meal_id} meal={item} setRateFood={setRateFood} setRateNumber={setRateNumber} setClickedId={setClickedId} />
            ))
                }
                </div>
            </div>

            }
        </section>
    );
};



const RateContainer = ({rateFood, setRateFood, clickedId, setClickedId, rateNumber, setRateNumber}) => {
    const userAuth = useAuth()
    const {token, refresh,setToken, setRefresh} = userAuth
    const handleYes = (e) => {
      e.preventDefault()
      const data = {
        meal_id: clickedId,
        rating: rateNumber,
      }

      ApiCall('rate/', 'post', token, refresh, setToken, setRefresh, data)
      .then((response) => {
        if(response.status  !== undefined && response.status === 200){
            ToastMessage("success", "Rating has been recorded")
            return
        }
        throw new Error(response.data.error)
      })
      .catch((error) => {
        ToastMessage("error", error.message? error.message: "An error occured")
      })
      .finally(() => {
        setClickedId('')
        setRateFood('')
        setRateNumber('')
      })
    }
    const handleNo = (e) => {
      e.preventDefault()
      setClickedId('')
      setRateFood('')
      setRateNumber('')
  
    }
  
    return(
      <div className={`z-100000 fixed centered-d centered-div ${clickedId? "block": "hidden"} bg-gray-900 text-white px-2 py-1 rounded-md`}>
        <p>Give {rateFood} a rating of {rateNumber}?</p>
        <div className='flex justify-around'>
          <p onClick={(e) => handleYes(e)}>Yes</p>
          <p onClick={(e) => handleNo(e)}>No</p>
        </div>
      </div>
    )
  
  }

