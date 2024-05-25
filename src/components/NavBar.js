import React from 'react'
import { useNavigate } from 'react-router-dom'

export const NavBar = () => {

    const navigate = useNavigate()

  return (
    <div className='flex flex-row justify-between shadow-md p-2 rounded-lg bg-gray-300 w-full' >
      <div className='flex justify-start'>
      <p className='poppins text-3xl font-bold'>EthnicEats</p>
      </div>
    <div className="flex items-center justify-end space-x-6">
        <button className="poppins" onClick={() => navigate('/login')}>Sign In</button>
        <button className=" bg-primary px-4 py-2 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105" onClick={() => navigate('/register')}>Sign Up</button>
    </div>
    </div>
  )
}
