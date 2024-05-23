import React, { useEffect } from 'react'
import { NavBar } from '../components'
import { useAuth } from '../hooks/AuthProvider'
import { useNavigate } from 'react-router-dom'

export const LandingPage = () => {
  // const navigate = useNavigate()
  // const user = useAuth()
  // const {token} = user
   
  // const checkIfUserIsAuthenticated = () => {
  //   if(token){
  //     navigate('/home')
  //   }
  // }

  // useEffect(() => {checkIfUserIsAuthenticated()}, [user])
  return (
    <div className='p-2 md:p-3 lg:p-4'>
      <NavBar />
      LandingPage
    </div>
  )
}
