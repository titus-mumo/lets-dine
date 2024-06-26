import React from 'react'
import { useState, useEffect} from 'react'
  ;
import 'react-toastify/dist/ReactToastify.css';
import { ToastMessage } from '../utils'
import { CuisineCard } from '../components';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';
import { CuisineTabs } from '../cuisineownercomponents';
import LoadingSpinner from './LandingPage';

require('dotenv').config()

export const Cuisines = () => {

    const [cuisines, setCuisines] = useState([]);
    const [loading, setLoading] = useState(true)

    const user = useAuth()
    const {token, refresh, setToken, setRefresh} = user

    const FetchCuisines = async() => {
        ApiCall('cuisines', 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            const { status, data} = response
            if(status === 200){
                setCuisines(data)
                setLoading(false)
            }else{
                throw new Error(response.data.error)
            }
        })
        .catch((error) => {
            ToastMessage(error.message? error.message: "An error occured")
        })
    }

    useEffect(() => {
        FetchCuisines();
    }, []);
  return (
    <section className='px-2 w-full md:px-3 lg:px-4 flex flex-col justify-center w-full mt-5 md:mt-10 lg:mt-0 pt-2 lg:pt-0'>
           
        {
            loading? <LoadingSpinner />:
            <div className='flex flex-rol flex-wrap my-2 justify-center'>
            {
            cuisines.length === 0 ? "Featured cuisines will appear here":cuisines.map((item) => (
                <CuisineCard key={item.cuisine_id} cuisine={item} />
            ))
                }
            </div>

        }
    </section>
  )
}
