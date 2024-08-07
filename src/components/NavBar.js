import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Menu, Close, FoodBankOutlined, Fastfood } from '@mui/icons-material'

export const NavBar = ({divRefs}) => {

    const navigate = useNavigate()
    

    const handleScrollClick = (targetDivId) => {
        const targetDiv = divRefs.current[targetDivId];
        if (targetDiv) {
          targetDiv.scrollIntoView({ behavior: 'smooth' });
        } else {
          //console.error(`Div with ID "${targetDivId}" not found!`);
        }

    }

    const [showMenuLandingPage, setShowMenuLandingPage] = useState(false)



  return (
    <header className='z-10 top-0 flex fixed flex-col justify-start shadow-md px-4 w-full items-center py-3 bg-gray-50'>
      <div className='flex flex-row justify-between w-full'>
        <div className='flex justify-between basis-2/5 items-center gap-4'>
          <p onClick={() => handleScrollClick('init')}  to="init" id='init' className='poppins text-lg md:text-2xl font-bold hover:cursor-pointer hover:text-blue-500 mr-4'>EthnicEats</p>
          <p onClick={() => handleScrollClick('about-us')}  to="about-us" id='about-us'  className='hidden lg:block text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500'>About</p>
          <p className='hidden lg:block'>~</p>
          <p onClick={() => handleScrollClick('features')}  to="features" id='features'  className='hidden lg:block text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500'>Features</p>
          <p className='hidden lg:block'>~</p>
          <p onClick={() => handleScrollClick('faqs')}  to="faqs"  className='hidden lg:block text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500'>FAQs</p>
          <p className='hidden lg:block'>~</p>
          <p onClick={() => handleScrollClick('whyus')}  to="whyus"  className='hidden lg:block text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500'>Testimonials</p>
          <p className='hidden lg:block'>~</p>
          <p onClick={() => handleScrollClick('pricing')} to="pricing"  className='hidden lg:block text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500'>Pricing</p>
          <p className='hidden lg:block'>~</p>
          <p onClick={() => handleScrollClick('contact')}  to="contact" className='hidden lg:block text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500'>Contact</p>
        </div>
        <div className='pr-3 flex flex-row-reverse items-center'>
          <div className='ml-5 header-menu hover:cursor-pointer block lg:hidden' onClick={() => setShowMenuLandingPage(prevCheck => !prevCheck)}>
            {
              showMenuLandingPage? <Close className='header-menu' />: <Menu className='header-menu' />
            }
          
          </div>
          <div className='flex flex-row items-center'>
            <button className="ml-5 hidden lg:block px-3 lg:px-4 py-0.5 lg:py-1 poppins rounded-md ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105 bg-pink-700 hover:bg-pink-800 hover:border-pink-700 border-1 border-pink-700 mr-4 text-white" onClick={() => navigate('/login')}>Login</button>
            <button className="ml-5 hidden lg:block  bg-primary px-4 py-1 text-white poppins rounded-md ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105 hover:bg-emerald-700 hidden lg:block" onClick={() => navigate('/register')}>Sign Up</button>
          </div>
        </div>
      </div>
      <div className={`w-full flex-col justify-start ${showMenuLandingPage? 'flex': 'hidden'} pl-3`}>
        <p onClick={() => handleScrollClick('about-us')}  to="about-us" id='about-us'  className='block lg:hidden text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500 py-2'>About</p>
        <p onClick={() => handleScrollClick('features')}  to="features" id='features'  className='block lg:hidden text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500 py-2'>Features</p>
        <p onClick={() => handleScrollClick('faqs')}  to="faqs"  className='block lg:hidden text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500 py-2'>FAQs</p>
        <p onClick={() => handleScrollClick('whyus')}  to="whyus"  className='block lg:hidden text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500 py-2'>Testimonials</p>
        <p onClick={() => handleScrollClick('pricing')} to="pricing"  className='block lg:hidden text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500 py-2'>Pricing</p>
        <p onClick={() => handleScrollClick('contact')}  to="contact" className='block lg:hidden text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500 py-2'>Contact</p>
      </div>
    </header>
  )
}
