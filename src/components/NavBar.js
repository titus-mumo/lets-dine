import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const NavBar = ({divRefs}) => {

    const navigate = useNavigate()
    

    const handleScrollClick = (targetDivId) => {
        const targetDiv = divRefs.current[targetDivId];
        if (targetDiv) {
          targetDiv.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.error(`Div with ID "${targetDivId}" not found!`);
        }

    }



  return (
    <header className='z-10 fixed top-0 left-0 flex flex-row justify-between shadow-md p-2 header w-full items-center pb-3' >
      <div className='flex justify-start basis-1/3'>
        <Link to='/' className='poppins text-lg md:text-2xl font-bold text-white hover:cursor-pointer hover:text-blue-500'>EthnicEats</Link>
      </div>
      <div className='flex justify-end lg:justify-between flex-row items-center basis-2/3'>
        <div className='hidden md:flex justify-around basis-3/5'>
          <p onClick={() => handleScrollClick('about-us')}  to="about-us" id='about-us'  className='text-white text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500'>About</p>
          <p onClick={() => handleScrollClick('contact')}  to="contact" className='text-white text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500'>Contact</p>
          <p onClick={() => handleScrollClick('faqs')}  to="faqs"  className='text-white text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500'>FAQs</p>
          <p onClick={() => handleScrollClick('pricing')} to="pricing"  className='text-white text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500'>Pricing</p>
          <p onClick={() => handleScrollClick('whyus')}  to="whyus"  className='text-white text-sm hover:text-pink-600 hover:cursor-pointer hover:duration-500'>Testimonials</p>
        </div>
        <div className="flex items-center justify-end space-x-6 pr-2 basis-2/5">
            <button className="px-3 lg:px-4 py-0.5 lg:py-1 text-white poppins rounded-md ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105 hover:bg-pink-700 hover:border-pink-700 border-2" onClick={() => navigate('/login')}>Login</button>
            <button className=" bg-primary px-4 py-1 text-white poppins rounded-md ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105 hover:bg-emerald-700 hidden lg:block" onClick={() => navigate('/register')}>Sign Up</button>
        </div>
      </div>
    </header>
  )
}
