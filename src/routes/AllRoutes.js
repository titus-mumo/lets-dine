import { Routes, Route } from "react-router-dom";
import { ChangePassword, Profile, AddMenu, ViewReservations, Reservation, CuisineDetail, Cuisines, LandingPage, Home, Login, Register } from "../pages";
import PrivateRoute from "./protectRoutes";


import React from 'react'

export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<PrivateRoute />} >
              <Route path='/change-password' element={<ChangePassword />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/home' element={<Home />} />
              <Route path='/cuisines' element={<Cuisines />} />
              <Route path='/cuisine/:cuisine_id/menu' element={<CuisineDetail />} />
              <Route path='/cuisine/:cuisine_id/menu/add' element={<AddMenu />} />
              <Route path='/cuisine/:cuisine_id/make_reservation' element={<Reservation />} />
              <Route path='/reservations' element={<ViewReservations />} />
            </Route>
        </Routes>
    </div>
  )
}
