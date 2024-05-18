import React from 'react'
import { useState, useEffect} from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastMessage } from '../utils'
import axios from 'axios';
import { CuisineCard } from '../components';
import { Link } from 'react-router-dom';

require('dotenv').config()

export const Cuisines = () => {

    const [cuisines, setCuisines] = useState([]);

    useEffect(() => {
        const FetchCuisines = async() => {
            try {
                const response = await axios.get(process.env.BASE_URL + 'cuisines/')
                setCuisines(response.data)
            } catch (error) {
                return ToastMessage("error", "Something went wrong")
            }
        }

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
