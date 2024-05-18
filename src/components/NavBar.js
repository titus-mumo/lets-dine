import React from 'react'
import { useNavigate } from 'react-router-dom'

export const NavBar = () => {

    const navigate = useNavigate()

  return (
    <div className="flex items-center justify-end space-x-6">
        <button className="poppins" onClick={() => navigate('/login')}>Sign In</button>
        <button className=" bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105" onClick={() => navigate('/register')}>Sign Up</button>
    </div>
  )
}
