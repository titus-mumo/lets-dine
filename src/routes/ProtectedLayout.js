import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UniversalSideBar } from '../components';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ForumIcon from '@mui/icons-material/Forum';
import RecommendIcon from '@mui/icons-material/Recommend';


const CuisineOwnerSidebarItems = [
  {
    title: "Home",
    link: "/cuisine-owner/home",
    icon: <HomeIcon />
  },
  {
    title: "Cuisines",
    link: "/cuisine-owner/home",
    icon: <StorefrontIcon />
    //TODO: Make a cuisine page
  },
  
  {
    title: "Reservations",
    link: "/cuisine-owner/reservations",
    icon: <EventSeatIcon />
  },
  {
    title: "Forums",
    link: "/cuisine-owner/forums",
    icon: <ForumIcon/>
  },
  {
    title: "Map",
    link: "/cuisine-owner/map",
    icon: <LocationOnIcon />
  },
  {
    title: "Analytics",
    link: "/cuisine-owner/analytics",
    icon: <AssessmentIcon />
  },
  {
    title: "Profile",
    link: "/cuisine-owner/account",
    icon: <AccountBoxIcon />
  }
]
const UserSidebarItems = [
  {
    title: "Home",
    link: "/home",
    icon: <HomeIcon />
  },
  {
    title: "Cuisines",
    link: "/cuisines",
    icon: <StorefrontIcon />
  },
  {
    title: "Reservations",
    link: "/reservations",
    icon: <EventSeatIcon />
  },
  {
    title: "Recommendations",
    link: "/recommendations",
    icon: <RecommendIcon />
  },
  {
    title: "Forums",
    link: "/forums",
    icon: <ForumIcon/>
  },
  {
    title: "Map",
    link: "/map",
    icon: <LocationOnIcon />
  },
  {
    title: "Profile",
    link: "/account",
    icon: <AccountBoxIcon />
  }
]


const MobileHeader = ({showMenu, setShowMenu}) => {
    return(
        <div className='block lg:hidden flex justify-around w-full fixed top-0  bg-gray-400 rounded-b-lg pt-2 pb-1.5 z-10000'>
            <p className='basis-1/2 text-left pl-2 hover:cursor-pointer' onClick={() => setShowMenu(!showMenu)}>{showMenu === false? <MenuIcon />: <CloseIcon />}</p>
            <p className='basis-1/2 text-right pr-2'>EthnicEats</p>
        </div>
    )
}

export const UserLayout = () => {
    const [showMenu, setShowMenu] = useState(false)
  return (
    <div className="flex h-screen w-100vh lg:items-start flex-row">
      <UniversalSideBar showMenu={showMenu} setShowMenu={setShowMenu} sidebarItems={UserSidebarItems}/>
      <div className='w-full h-100vh lg:ml-255px lg:mr-5px'>
        <MobileHeader showMenu={showMenu} setShowMenu={setShowMenu}/>
        <Outlet/>
        </div>
    </div>
  );
};

export const CuisineLayout = () => {
  const [showMenu, setShowMenu] = useState(false)
return (
  <div className="flex h-screen w-100vh lg:items-start flex-row">
    <UniversalSideBar showMenu={showMenu} setShowMenu={setShowMenu} sidebarItems={CuisineOwnerSidebarItems}/>
    <div className='w-full h-100vh lg:ml-255px lg:mr-5px'>
      <MobileHeader showMenu={showMenu} setShowMenu={setShowMenu}/>
      <Outlet/>
      </div>
  </div>
);
};


