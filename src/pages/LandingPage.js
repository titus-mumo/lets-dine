import React, { useEffect } from 'react'
import { NavBar } from '../components'
import { useAuth } from '../hooks/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LandingPageImage from '../assets/bg.jpg'
import IngredientsImage from '../assets/honey.jpeg'

export const LandingPage = () => {
  // const navigate = useNavigate()
  // const user = useAuth()
  // const {token} = user
   
  // const checkIfUserIsAuthenticated = () => {
  //   if(token){
  //     navigate('/home')
  //   }
  // }

  // useEffect(() => {checkIfUserIsAuthenticated()}, [user])
  return (
    <div className='p-2 md:p-3 lg:p-4 flex flex-col w-full justify-center'>
      <div className='flex flex-col h-full justify-around'>
      <NavBar />
      <div className='mt-8 md:mt-16 lg:mt-20 flex flex-col lg:flex-row justify-between items-center w-full lg:w-9/10' style={{ backgroundImage: '../assets/bg.jpg', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='lg:mr-10 basis-1/2'>
          <div className='flex flex-col justify-start items-start'>
            <h2 className='text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 text-center lg:text-left'>DISCOVER THE WRLD ONE BITE AT A TIME</h2>
            <p className='text-lg lg:text-xl mb-6 text-center lg:text-left'>Enjoy authentic dishes from around the globe. Discover new flavors and savor the richness of different cultures.</p>
            <div className='flex justify-center lg:justify-start'>
              <Link to='/register' className="font-semibold w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary">GET STARTED</Link>
            </div>
          </div>
        </div>
        <div className='mt-8 lg:mt-0 basis-1/2'>
          <img className='border-md rounded-2xl shadow-lg' />
        </div>
      </div>
      <hr></hr>
      </div>
      <div className='about-us'>
        <h1 className='poppins'>ABOUT US</h1>
        <div className='flex flex-col lg:flex-row'>
        <div>
          <img src={IngredientsImage} alt='meal image' className=''></img>
        </div>
          <div >
            <p>We are a revolutionary digital platform designed to transform the way you discover and enjoy ethnic cuisines. Our mission is to connect food enthusiasts and travelers with authentic and diverse dining experiences, leveraging the power of AI and machine learning to provide personalized recommendations. By analyzing social media trends and user reviews, we bring you the most genuine ethnic eateries, ensuring every meal is an adventure.</p>
            <h1>What We Offer</h1>
            <div>
              <h1>Personalised Recommendations</h1>
              <p>Using advanced AI and machine learning algorithms, EthnicEats tailors its recommendations to your unique tastes and preferences. Say goodbye to generic suggestions and hello to a feed that knows your palate better than you do.</p>
            </div>
            <div>
              <h1>Social Media Integration</h1>
              <p>Stay ahead of the trends with our real-time analysis of social media buzz. We scour platforms like Instagram, Twitter, and Facebook to bring you the latest in ethnic dining hotspots, ensuring you’re always in the know.</p>
            </div>
            <div>
              <h1>User Reviews and Ratings</h1>
              <p>Our platform aggregates and analyzes reviews from various sources, providing you with a comprehensive view of what others are saying. This helps you make informed dining decisions based on collective experiences.</p>
            </div>
            <div>
              <h1>CommunityEngagement</h1>
              <p>Join our vibrant community forums to discuss your dining experiences, share photos, and connect with fellow food lovers. EthnicEats fosters a sense of community among users who share a passion for ethnic cuisines.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
