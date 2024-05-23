import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'
import { ApiCall } from '../hooks/ApiCall'

const ProtectCuisineOwnerRoutes = () => {
  const userAuth = useAuth()
  const {token, refresh, setToken, setRefresh} = userAuth;

//   ApiCall('auth/user/', 'get', token, refresh, setToken, setRefresh)
//   .then(function(response){
//     if( response.status === 200 && !response.data.groups[0]){
//       return <Navigate to='/home' />
//     }
//   })
//   .catch((error) => {
//     window.location.reload();
//   })

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