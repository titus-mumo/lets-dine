import { Routes, Route } from "react-router-dom";
import { ResetPassword, ForgotPassword, Reccomendations, GeneralForums, Account, PageNotFound, Map, AddReview, ReservationsPage, CuisineAnalytics, CuisineOwnerMenuAdd, CuisineMenu, CuisineHome, NewCuisine, ChangePassword, UserProfile, AddMenu, ViewReservations, Reservation, CuisineDetail, Cuisines, LandingPage, Home, Login, Register, MapUser, EditMenu, EditReservation } from "../pages";
import PrivateRoute from "./protectRoutes";
import ProtectUserRoutes from "./ProtectUserRoutes";
import ProtectCuisineOwnerRoutes from "./ProtectCuisineOwnerRoutes";
import React from 'react'
import { UserLayout } from "./ProtectedLayout";
import { CuisineLayout } from "./ProtectedLayout";
import TermsAndConditions from "../pages/TermsAndPolicy";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import AcceptableUseNotice from "../pages/AcceptableUseNotice";


export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:uid/:token' element={<ResetPassword />} />
        <Route path='/terms_and_conditions' element={<TermsAndConditions />}/>
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />
        <Route path="/acceptable_use_notice" element={<AcceptableUseNotice />} />
      <Route element={<PrivateRoute />} >
        <Route element={<UserLayout />}>
          <Route element={<ProtectUserRoutes />} >
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/home' element={<Home />} />
            <Route path='/cuisines' element={<Cuisines />} />
            <Route path='/cuisine/:cuisine_id/menu' element={<CuisineDetail />} />
            <Route path='/cuisine/:cuisine_id/menu/add' element={<AddMenu />} />
            <Route path='/cuisine/:cuisine_id/make_reservation' element={<Reservation />} />
            <Route path='/reservations' element={<ViewReservations />} />
            <Route path='/cuisine/:cuisine_id/add-review' element={<AddReview />} />
            <Route path='/forums' element={<GeneralForums />} />
            <Route path='/map' element={<MapUser />} />
            <Route path='/recommendations' element={<Reccomendations />} />
            <Route path='/account' element={<UserProfile />} />
            <Route path='/reservation/edit' element={<EditReservation />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Route>
        <Route element={<CuisineLayout />}>
          <Route element={<ProtectCuisineOwnerRoutes />} >
            <Route path='/cuisine-owner/home' element={<CuisineHome />} />
            <Route path='/cuisine-owner/cuisines' element={<CuisineHome />} />
            <Route path='/cuisine-owner/new' element={<NewCuisine />} />
            <Route path='/cuisine-owner/cuisine/:cuisine_id/menu' element={<CuisineMenu />} />
            <Route path='/cuisine-owner/cuisine/:cuisine_id/edit' element={<EditMenu />} />
            <Route path='/cuisine-owner/:cuisine_id/menu/add' element={<CuisineOwnerMenuAdd />} />
            <Route path='/cuisine-owner/analytics' element={<CuisineAnalytics />} />
            <Route path='/cuisine-owner/reservations' element={<ReservationsPage />} />
            <Route path='/cuisine-owner/map' element={<Map />} />
            <Route path='/cuisine-owner/account' element={<Account />} />
            <Route path='/cuisine-owner/forums' element={<GeneralForums />} />
            <Route path='/cuisine-owner/cuisine/:cuisine_id/menu/add' element={<AddMenu />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
