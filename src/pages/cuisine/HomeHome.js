import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../../hooks/AuthProvider'
import { ApiCall } from '../../hooks/ApiCall'
import { CuisineCard } from '../../cuisineownercomponents'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../LandingPage'
import { ToastMessage } from '../../utils'


export const HomeHome = () => {
    const [ownedCuisine, setOwnedCusine] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const userAuth = useAuth();
    const {token, refresh, setToken, setRefresh} = userAuth
    const getCuisineOwnedByCuisineOwner = async() => {
        ApiCall('cuisines/', 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            if(response.status === 200 && response.data.length > 0){
                setOwnedCusine(response.data)
                localStorage.setItem("cuisines", true)
                setLoading(false)
                return;
            }else{
                localStorage.setItem("cuisines", false)
                setTimeout(() => {
                    navigate('/cuisine-owner/new', {state: {cuisines: 0}})
                    setLoading(false)
                }, 50)
            }
        })
        .catch((error) => {
            return ToastMessage("error", "An error occured")
        })
    }


    useEffect(() => {
        getCuisineOwnedByCuisineOwner()
    }, [])
    
      if (loading){
        return <LoadingSpinner />
      }
  return (
    <div className='w-full flex justify-around flex-col  mt-2 lg:mt-0 lg:pl-6 bg-cyan-200'>
        <div className='w-auto mt-2 flex w-full justify-center'>
            <Link to='/cuisine-owner/new' className='m-1 mb-0 poppins px-3 py-2 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 rounded-lg transition duration-300'>Add another Cuisine</Link>
        </div>
        <div className= 'flex flex-rol flex-wrap my-1 justify-center md:justify-around'>
            {
                ownedCuisine.map((item, index) => <CuisineCard key={item.cuisine_id} cuisine={item}  />)
            }
        </div>
    </div>
  )
}
