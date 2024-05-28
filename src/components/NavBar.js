import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link, animateScroll as scroll } from 'react-scroll'

export const NavBar = () => {

    const navigate = useNavigate()

  return (
    <div className='flex flex-row justify-between shadow-md p-2 header w-full items-center pb-3' >
      <div className='flex justify-start'>
      <p className='poppins text-3xl font-bold text-white hover:cursor-pointer hover:text-blue-500'>EthnicEats</p>
      </div>
      <div className='hidden md:flex basis-2/5 justify-around'>
        <Link to="about-us" spy={true} smooth={true} offset={-70} duration={700} className='text-white text-sm hover:text-pink-600 hover:cursor-pointer'>About</Link>
        <Link to="contact" spy={true} smooth={true} offset={-70} duration={700} className='text-white text-sm hover:text-pink-600 hover:cursor-pointer'>Contact</Link>
        <Link to="faqs" spy={true} smooth={true} offset={-70} duration={700} className='text-white text-sm hover:text-pink-600 hover:cursor-pointer'>FAQs</Link>
        <Link to="whyus" spy={true} smooth={true} offset={-70} duration={700} className='text-white text-sm hover:text-pink-600 hover:cursor-pointer'>Testimonials</Link>
      </div>
    <div className="flex items-center justify-end space-x-6 pr-2">
        <button className="px-4 py-2 text-white poppins rounded-md ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105 hover:bg-sky-800 border-2" onClick={() => navigate('/login')}>Login</button>
        <button className=" bg-primary px-4 py-2 text-white poppins rounded-md ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105 hover:bg-emerald-700 hidden lg:block" onClick={() => navigate('/register')}>Sign Up</button>
    </div>
    </div>
  )
}
