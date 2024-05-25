import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NavBar } from './NavBar'

export const CuisineTabs = () => {
    const navigate = useNavigate()

    const location = useLocation()

    const [menuTab, setMenuTab] = useState(location.pathname === '/cuisine-owner/home' ? 'cuisines': location.pathname === '/cuisine-owner/analytics' ? 'analytics' : 'reservations')

    const handleMenuTabs = (link) => {
        setMenuTab(link)
        setTimeout(() => {
            if(link === 'cuisines'){
                navigate('/cuisine-owner/home')
            }else if(link === 'analytics'){
                navigate('/cuisine-owner/analytics')
            }else if(link === 'reservations'){
                navigate('/cuisine-owner/reservations')
            }

        }, 100) 
    }
  return (
    <div className="w-full flex items-center justify-around space-x-6 my-4 flex-col">
        <NavBar />
        {/* <div className='w-full flex items-center justify-center space-x-6 my-4'>
        <p className={menuTab === 'cuisines' ? "active_menu_tab poppins bg-primary" : "menu_tab poppins"} onClick={() => handleMenuTabs('cuisines')}>Cuisines</p>
        <p className={menuTab === 'reservations' ? "active_menu_tab poppins bg-primary" : "menu_tab poppins"} onClick={() => handleMenuTabs('reservations')}>Reservations</p>
        <p className={menuTab === 'analytics' ? "active_menu_tab poppins bg-primary" : "menu_tab poppins"} onClick={() => handleMenuTabs('analytics')}>Analytics</p>
        </div> */}
    </div>
  )
}
