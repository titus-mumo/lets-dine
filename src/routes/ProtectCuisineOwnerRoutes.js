import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'
import { ApiCall } from '../hooks/ApiCall'

const ProtectCuisineOwnerRoutes = () => {
  const userAuth = useAuth()

    const role = localStorage.getItem("role")
    if(role === 'user'){
        return <Navigate to='/home' />
    } else if(role !== 'owner'){
        return <Navigate to='/login' />
    }
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectCuisineOwnerRoutes;