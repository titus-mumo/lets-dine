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
    <section className='p-2 md:p-3 lg:p-4'>
        <ToastContainer />
        <div className='mt-5'>
            <Link to='/home' className='px-6 w-full py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>View Main menu</Link>
        </div>
        <div className='flex flex-rol flex-wrap my-5'>
        {
        cuisines.map((item) => (
            <CuisineCard key={item.cuisine_id} cuisine={item} />
        ))
            }
        </div>
        

    </section>
  )
}
