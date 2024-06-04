import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../../hooks/AuthProvider'
import { ApiCall } from '../../hooks/ApiCall'
import { CuisineCard } from '../../cuisineownercomponents'
import { Link, useNavigate } from 'react-router-dom'
import { CuisineTabs } from '../../cuisineownercomponents'
import LoadingSpinner from '../LandingPage'


export const CuisineHome = () => {
    const [ownedCuisine, setOwnedCusine] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const userAuth = useAuth();
    const {token, refresh, setToken, setRefresh} = userAuth
    const getCuisineOwnedByCuisineOwner = async() => {
        ApiCall('cuisines/owner/', 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
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

    useEffect(() => {
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      }, [])
    
      if (loading){
        return <LoadingSpinner />
      }
  return (
    <div className='w-full flex justify-around flex-col  pt-2 lg:pt-0 lg:pl-6'>
        <CuisineTabs />
        <div className='w-auto my-4 flex w-full justify-center'>
            <Link to='/cuisine-owner/new' className='m-2 mb-0 poppins px-3 py-2 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 rounded-lg transition duration-300'>Add another Cuisine</Link>
        </div>
        <div className='w-full flex justify-around flex-wrap'>
            {
                ownedCuisine.map((item) => <CuisineCard key={item.cuisine_id} cuisine={item}/>)
            }
        </div>
    </div>
  )
}
