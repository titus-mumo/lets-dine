import React from 'react'
import { useAuth } from '../../hooks/AuthProvider'
import { ApiCall } from '../../hooks/ApiCall'
import { ToastMessage } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { CuisineTabs } from '../../cuisineownercomponents'

export const Account = () => {
  const userAuth = useAuth()
  const {token, refresh, setToken, setRefresh, logOut} = userAuth

  const navigate = useNavigate()

    const handleLogout = (e) => {
      e.preventDefault();
      const data = {
          refresh_token: refresh
      }
      ApiCall('auth/logout/', 'post', token, refresh, setToken, setRefresh, data)
      .then(function(response){
          if (response.status === 205) {
              console.log("Token blacklisted")
          }
      })
      .catch((error) => {
          return console.log("An error occured logut")
      })
      ToastMessage("success", "Logout Successful")
      setTimeout(() => {
          navigate('/login')
          setTimeout(() => {logOut()}, 1000)
      }, 2000)
  }
  return (
    <div className='flex justify-around flex-col w-full h-screen align-center pt-2 lg:pt-0 px-2 w-full md:px-3 lg:px-4'>
      <CuisineTabs />
      <div className='flex justify-center flex-col m-auto'>
        <p className='text-center'>Account</p>
        <button className= 'mx-2 px-3 py-2 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins' onClick={(e) => handleLogout(e)}>Logout</button>
      </div>
    </div>
  )
}
