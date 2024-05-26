import { Routes, Route } from "react-router-dom";
import { GeneralForums, Account, PageNotFound, Map, AddReview, ReservationsPage, CuisineAnalytics, CuisineOwnerMenuAdd, CuisineMenu, CuisineHome, NewCuisine, ChangePassword, Profile, AddMenu, ViewReservations, Reservation, CuisineDetail, Cuisines, LandingPage, Home, Login, Register, MapUser } from "../pages";
import PrivateRoute from "./protectRoutes";
import ProtectUserRoutes from "./ProtectUserRoutes";
import ProtectCuisineOwnerRoutes from "./ProtectCuisineOwnerRoutes";
import React from 'react'
import { UserLayout } from "./ProtectedLayout";
import { CuisineLayout } from "./ProtectedLayout";



export const AllRoutes = () => {
  return (
    <Routes>
          <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      <Route element={<PrivateRoute />} >
        <Route element={<UserLayout />}>
          <Route element={<ProtectUserRoutes />} >
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/home' element={<Home />} />
            <Route path='/cuisines' element={<Cuisines />} />
            <Route path='/cuisine/:cuisine_id/menu' element={<CuisineDetail />} />
            <Route path='/cuisine/:cuisine_id/menu/add' element={<AddMenu />} />
            <Route path='/cuisine/:cuisine_id/make_reservation' element={<Reservation />} />
            <Route path='/reservations' element={<ViewReservations />} />
            <Route path='/cuisine/:cuisine_id/add-review' element={<AddReview />} />
            <Route path='/forums' element={<GeneralForums />} />
            <Route path='/map' element={<MapUser />} />
            <Route path='/account' element={<Account />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Route>
        <Route element={<CuisineLayout />}>
          <Route element={<ProtectCuisineOwnerRoutes />} >
            <Route path='/cuisine-owner/home' element={<CuisineHome />} />
            <Route path='/cuisine-owner/new' element={<NewCuisine />} />
            <Route path='/cuisine-owner/cuisine/:cuisine_id/menu' element={<CuisineMenu />} />
            <Route path='/cuisine-owner/:cuisine_id/menu/add' element={<CuisineOwnerMenuAdd />} />
            <Route path='/cuisine-owner/analytics' element={<CuisineAnalytics />} />
            <Route path='/cuisine-owner/reservations' element={<ReservationsPage />} />
            <Route path='/cuisine-owner/map' element={<Map />} />
            <Route path='/cuisine-owner/account' element={<Account />} />
            <Route path='/cuisine-owner/forums' element={<GeneralForums />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
