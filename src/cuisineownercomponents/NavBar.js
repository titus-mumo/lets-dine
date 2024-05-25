import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';

export const NavBar = () => {
    const [isHovered, setIsHovered] = useState(false);

    const userAuth = useAuth()
    const {user} = userAuth
  return (
    <div className='hidden lg:flex w-full flex-row justify-between px-3 shadow-md mt-0.5 mx-2 py-2.5 items-center rounded-md bg-gray-600 text-white'>
        <p className='poppins'>EthnicEats</p>
        <div className='hover:cursor-pointer' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <LogoutIcon />
          {/* TODO: Fix hover message and logout funtion */}
          {/* {isHovered && (
        <div className='absolute top-full mt-1 bg-gray-800 text-white text-sm p-2 rounded shadow-lg'>
          Logout
        </div>
      )} */}
        </div>
    </div>
  )
}
