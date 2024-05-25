import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { useAuth } from '../hooks/AuthProvider';
import { ToastMessage } from '../utils';
import { useLocation, useNavigate } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ForumIcon from '@mui/icons-material/Forum';


const CuisineOwner = [
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
const User = [
  {
    title: "Home",
    link: "/home",
    icon: <HomeIcon />
  }
]

export const UniversalSideBar = ({showMenu}) => {
  console.log(showMenu)
  const [sidebarItems, setSidebarItems] = useState(CuisineOwner)
  const role = localStorage.getItem("role")
  // if(role){
  //   if(role === 'user'){
  //     setSidebarItems(User)
  //   } else if(role === 'owner'){
  //     setSidebarItems(CuisineOwner)
  //   } else{
  //     return ToastMessage("error", "Something went wrong")
  //   }
  // }

  return (
    <div className={`z-100000 ${showMenu === false? 'hidden': 'block top-9 w-200px'} lg:block lg:w-250px bg-gray-800 text-white flex items-start rounded-lg fixed lg:top-0.5 left-0.5`}>
      <div className='flex flex-col justify-center w-full p-1'>
        {
          sidebarItems.map((item, index) => <ReturnItems key={index} item={item}/>
          )
        }
      </div>
    </div>
  )
}


const ReturnItems = ({ item }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => { navigate(item.link); }}
      className={`flex justify-center items-center w-full text-center py-2 my-0.5 hover:cursor-pointer rounded-lg ${location.pathname === item.link ? "back" : ""}`}
    >
      <p className='basis-1/3 text-right pr-2'>{item.icon}</p>
      <p className='basis-2/3 text-left'>{item.title}</p>
    </div>
  );
};