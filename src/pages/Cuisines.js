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
    const {token, refresh, setToken} = user

    const FetchCuisines = async() => {
        ApiCall('cuisines', 'get', token, refresh, setToken)
        .then(function(response){
            const { status, data} = response
            if(status === 200){
                setCuisines(data)
            }
        })
        .catch((error) => {
            return ToastMessage("error", "Something went wrong")
        })
    }

    useEffect(() => {
        FetchCuisines();
    }, []);
  return (
    <section>
        <ToastContainer />
        {
        cuisines.map((item) => (
            <CuisineCard key={item.cuisine_id} cuisine={item} />
        ))
            }
            <Link to='/home'>View Main menu</Link>
    </section>
  )
}
