import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../../hooks/AuthProvider'
import { ApiCall } from '../../hooks/ApiCall'
import { CuisineCard } from '../../cuisineownercomponents'
import { Link, useNavigate } from 'react-router-dom'
import { CuisineTabs } from '../../cuisineownercomponents'


export const CuisineHome = () => {
    const [ownedCuisine, setOwnedCusine] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const userAuth = useAuth();
    const {token, refresh, setToken, setRefresh} = userAuth
    const getCuisineOwnedByCuisineOwner = async() => {
        ApiCall('cuisines/owner/', 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            console.log(response)
            if(response.status === 200 && response.data.length > 0){
                setOwnedCusine(response.data)
                setLoading(false)
                return;
            }else{
                setTimeout(() => {navigate('/cuisine-owner/new')}, 50)
            }
        })
        .catch((error) => {
            return console.log("An error occured")
        })
    }

    useEffect(() => {
        getCuisineOwnedByCuisineOwner()
    }, [])
  return (
    <div className='w-full flex justify-center flex-col '>
        <CuisineTabs />
        <div className='w-auto my-4'>
            <Link to='/cuisine-owner/new' className='m-4 poppins px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300'>Add another Cuisine</Link>
        </div>
        <div className='w-full flex justify-around flex-wrap'>
            {
                ownedCuisine.map((item) => <CuisineCard key={item.cuisine_id} cuisine={item}/>)
            }
        </div>
    </div>
  )
}
