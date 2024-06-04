import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const NavBar = ({divRefs}) => {
    const [isSticky, setIsSticky] = useState(false);
    const navigate = useNavigate()
    

    const handleScrollClick = (targetDivId) => {
        const targetDiv = divRefs.current[targetDivId];
        if (targetDiv) {
          targetDiv.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.error(`Div with ID "${targetDivId}" not found!`);
        }

    }

      // Event listener for scroll position
  const handleScroll = () => {
    const scrollY = window.scrollY; // Get current scroll position
    setIsSticky(scrollY <= prevScrollY); // Update sticky state based on scroll direction
    prevScrollY = scrollY; // Update previous scroll position
  };

  let prevScrollY = window.scrollY; // Initialize previous scroll position

  // Add event listener on component mount
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
  }, []);



  return (
    <header
    className={`fixed top-0 left-0 flex flex-row justify-between shadow-md p-2 header w-full items-center pb-3 ${
      isSticky ? 'sticky' : ''
    }`} // Add/remove 'sticky' class based on state
  >
      <div className='flex justify-start'>
      <p className='poppins text-3xl font-bold text-white hover:cursor-pointer hover:text-blue-500'>EthnicEats</p>
      </div>
      <div className='hidden md:flex basis-2/5 justify-around'>
        <p onClick={() => handleScrollClick('about-us')}  to="about-us" id='about-us'  className='text-white text-sm hover:text-pink-600 hover:cursor-pointer'>About</p>
        <p onClick={() => handleScrollClick('contact')}  to="contact" className='text-white text-sm hover:text-pink-600 hover:cursor-pointer'>Contact</p>
        <p onClick={() => handleScrollClick('faqs')}  to="faqs"  className='text-white text-sm hover:text-pink-600 hover:cursor-pointer'>FAQs</p>
        <p onClick={() => handleScrollClick('pricing')} to="pricing"  className='text-white text-sm hover:text-pink-600 hover:cursor-pointer'>Pricing</p>
        <p onClick={() => handleScrollClick('whyus')}  to="whyus"  className='text-white text-sm hover:text-pink-600 hover:cursor-pointer'>Testimonials</p>
      </div>
    <div className="flex items-center justify-end space-x-6 pr-2">
        <button className="px-3 lg:px-4 py-1 lg:py-2 text-white poppins rounded-md ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105 hover:bg-sky-800 border-2" onClick={() => navigate('/login')}>Login</button>
        <button className=" bg-primary px-4 py-2 text-white poppins rounded-md ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105 hover:bg-emerald-700 hidden lg:block" onClick={() => navigate('/register')}>Sign Up</button>
    </div>
    </header>
  )
}
