import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NavBar } from './NavBar'

export const CuisineTabs = () => {
    const navigate = useNavigate()

    const location = useLocation()

    const [menuTab, setMenuTab] = useState(location.pathname === '/cuisine-owner/home' ? 'cuisines': location.pathname === '/cuisine-owner/analytics' ? 'analytics' : 'reservations')
  return (
    <div className="w-full flex items-center justify-around space-x-6 my-4 flex-col">
        <NavBar />
    </div>
  )
}
