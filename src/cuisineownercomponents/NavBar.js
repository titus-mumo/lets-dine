import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'

export const NavBar = () => {
    const userAuth = useAuth()
    const {user} = userAuth
  return (
    <div className='w-full flex flex-row justify-between px-3 shadow-md mt-0.5 mx-2 py-2.5 items-center rounded-md bg-gray-600 text-white'>
        <p className='poppins'>Cuisine Owner Dashboard {user.username}</p>
        <Link className='poppins'>My Profile</Link>
    </div>
  )
}
