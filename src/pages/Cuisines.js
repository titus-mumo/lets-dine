import React from 'react'
import { useState, useEffect} from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastMessage } from '../utils'
import { CuisineCard } from '../components';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';

require('dotenv').config()

export const Cuisines = () => {

    const [cuisines, setCuisines] = useState([]);

    const user = useAuth()
    const {token, refresh, setToken, setRefresh} = user

    const FetchCuisines = async() => {
        ApiCall('cuisines', 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            const { status, data} = response
            if(status === 200){
                setCuisines(data)
            }
        })
        .catch((error) => {
            return console.log("Something went wrong")
        })
    }

    useEffect(() => {
        FetchCuisines();
    }, []);
  return (
    <section className='px-2 md:px-3 lg:px-4 flex flex-col justify-center w-full mt-10 lg:mt-0'>
        <ToastContainer />
        <div className=' mt-1 lg:mt-5 w-full flex justify-center'>
            <Link to='/home' className='px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 rounded-lg transition duration-300 poppins'>View Main menu</Link>
        </div>
        <div className='flex flex-rol flex-wrap my-2 justify-center'>
        {
        cuisines.map((item) => (
            <CuisineCard key={item.cuisine_id} cuisine={item} />
        ))
            }
        </div>
        

    </section>
  )
}
