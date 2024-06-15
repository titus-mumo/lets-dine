import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'
import { ApiCall } from '../hooks/ApiCall'

const ProtectUserRoutes = () => {
  const userAuth = useAuth()
  const {token, refresh, setToken, setRefresh} = userAuth;

  const role = localStorage.getItem("role")
  if(role === 'owner'){
      return <Navigate to='/cuisine-owner/home' />
  } else if(role !== 'user'){
      return <Navigate to='/login' />
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectUserRoutes;
