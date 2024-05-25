import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UniversalSideBar } from '../components';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const MobileHeader = ({showMenu, setShowMenu}) => {
    return(
        <div className='block lg:hidden flex justify-around w-full fixed top-0  bg-gray-400 rounded-b-lg pt-2 pb-1.5 z-10000'>
            <p className='basis-1/2 text-left pl-2 hover:cursor-pointer' onClick={() => setShowMenu(!showMenu)}>{showMenu === false? <MenuIcon />: <CloseIcon />}</p>
            <p className='basis-1/2 text-right pr-2'>EthnicEats</p>
        </div>
    )
}

const ProtectedLayout = () => {
    const [showMenu, setShowMenu] = useState(false)
  return (
    <div className="flex h-screen w-100vh lg:items-start flex-row">
      <UniversalSideBar showMenu={showMenu}/>
      <div className='w-full h-full lg:ml-255px lg:mr-5px'>
        <MobileHeader showMenu={showMenu} setShowMenu={setShowMenu}/>
        <Outlet/>
        </div>
    </div>
  );
};

export default ProtectedLayout;

