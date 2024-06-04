import React, { useState } from 'react'
import { useAuth } from '../hooks/AuthProvider';
import { ToastMessage } from '../utils';
import { useLocation, useNavigate } from 'react-router-dom';

export const UniversalSideBar = ({showMenu, setShowMenu, sidebarItems}) => {

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
      className={`flex justify-center items-center w-full text-center py-2 my-0.5 hover:cursor-pointer rounded-lg ${location.pathname === item.link ? "bg-slate-900" : "hover:bg-slate-700 hover:transition-smooth"}`}
    >
      <p className='basis-1/3 text-right pr-2'>{item.icon}</p>
      <p className='basis-2/3 text-left'>{item.title}</p>
    </div>
  );
};