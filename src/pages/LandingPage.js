import React, { useEffect, useState, useRef } from 'react'
import { NavBar } from '../components'
import { useAuth } from '../hooks/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LandingPageImage from '../assets/bg.jpg'
import AboutSectionImage from '../assets/about-modified.png'
import { LocationOn } from '@mui/icons-material'
import { Email } from '@mui/icons-material'
import { Call } from '@mui/icons-material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment/moment'


export const LandingPage = () => {
  return (
    <div className='flex flex-col w-screen justify-center'>
      <NavBar />
      <Home />
      <AboutUs />
      <FAQs />
      <WhyUs />
      <Contact />
      <Footer />
    </div>

  )
}


const Home = () => {
  return(
    <div className='home flex flex-col lg:flex-row justify-between items-center w-full bg-gradient-to-r from-zinc-800 to-sky-900 py-64'>
      <div className='w-full flex justify-center'>
        <div className='flex flex-col justify-center w-full'>
          <h2 className='text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 text-center text-white'>EXPLORE. DISCOVER. <span className='text-pink-700'>DINE. </span> SHARE.</h2>
          <p className='text-lg lg:text-xl mb-6 text-center text-white'>Enjoy authentic dishes from around the globe. Discover new flavors and savor the richness of different cultures.</p>
          <div className='flex justify-center'>
            <Link to='/register' className="font-medium w-auto px-6 py-3 text-white rounded-lg hover:bg-pink-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary border-2 hover:border-pink-700">GET STARTED</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const AboutUs = () => {
  return(
    <div className='about-us w-full p-3 lg:py-20 bg-gradient-to-b from-zinc-900 to-zinc-700'>
      <h1 className='w-full text-center text-2xl font-bold mt-4 mb-2 text-white'>ABOUT US</h1>
      <p className='w-full text-center text-lg font-medium mb-4 text-white'>Our mission is to connect food lovers with authentic ethnic cuisines, fostering cultural appreciation and community engagement.</p>
      <div className='flex justify-center items-center lg:justify-around flex-col md:flex-row'>
      <div className='lg:basis-1/5 items-center h-full mb-3 md:mb-0'>
        <img src={AboutSectionImage} alt='about image' className='w-full rotate'></img>
      </div>
      <div className='flex flex-col lg:grid lg:grid-cols-2 w-full justify-around lg:w-2/3 lg:ml-3'>
          <div className='w-full md:w-2/3 self-center mb-2'>
            <h1 className='text-center text-white text-md font-semibold'>Personalised Recommendations</h1>
            <p className='text-center text-white'>Using advanced AI and machine learning algorithms, EthnicEats tailors its recommendations to your unique tastes and preferences. Say goodbye to generic suggestions and hello to a feed that knows your palate better than you do.</p>
          </div>
          <div className='w-full md:w-2/3 self-center mb-2'>
            <h1 className='text-center text-white mb-2 text-md font-semibold'>Social Media Integration</h1>
            <p className='text-center text-white'>Stay ahead of the trends with our real-time analysis of social media buzz. We scour platforms like Instagram, Twitter, and Facebook to bring you the latest in ethnic dining hotspots, ensuring you’re always in the know.</p>
          </div>
          <div className='w-full md:w-2/3 self-center mb-2'>
            <h1 className='text-center text-white text-md font-semibold'>User Reviews and Ratings</h1>
            <p  className='text-center text-white'>Our platform aggregates and analyzes reviews from various sources, providing you with a comprehensive view of what others are saying. This helps you make informed dining decisions based on collective experiences.</p>
          </div>
          <div className='w-full md:w-2/3 self-center mb-2'>
            <h1  className='text-center text-white text-md font-semibold'>Community Engagement</h1>
            <p  className='text-center text-white'>Join our vibrant community forums to discuss your dining experiences, share photos, and connect with fellow food lovers. EthnicEats fosters a sense of community among users who share a passion for ethnic cuisines.</p>
          </div>
        </div>
        </div>
        </div>
  )
}


const Contact = () => {
  const handleContactForm = (e) => {
    e.preventDefault()
  }
  return(
    <div className='contact w-full py-5 md:py-20 lg:py-24  bg-gradient-to-b from-stone-700 to-teal-800'>
      <h1 className='text-center text-2xl font-bold my-4'>CONTACT</h1>
      <div className='flex flex-col lg:flex-row-reverse w-full justify-center items-start lg:items-center'>
        <div className='basis-full lg:basis-1/2 self-center p-4'>
          <h2 className='text-xl font-semibold'>TALK TO US</h2>
          <p className='my-2'>Fill the form below, and we will get back to you as soon as possible</p>
          <form onSubmit={(e) => handleContactForm(e)} className='w-full lg:w-2/3'>
            <div className='flex flex-col lg:flex-row lg:space-x-2 w-full'>
              <input placeholder='Name' type='text' className='mt-3 basis-1/2 p-2 border rounded-lg' required />
              <input placeholder='Email' type='email' className='mt-3 basis-1/2 p-2 border rounded-lg' required />
            </div>
            <input placeholder='Subject' type='text' className='mt-3 p-2 border rounded-lg w-full floating-input' required /><br />
            <textarea placeholder='Message' className='mt-3 p-2 border rounded-lg h-32 w-full' required></textarea><br />
            <div className='w-full flex justify-center'>
              <button type='submit' className='text-center bg-slate-900 py-2 text-white rounded-md shadow-md px-3 my-2'>Send Message</button>
            </div>
          </form>
        </div>
        <div className='lg:mt-4 lg:h-full flex flex-col lg:flex-col items-center w-full lg:basis-1/2 p-4'>
          <div>
          <div className='flex items-center my-2'>
            <LocationOn className='mr-2' />
            <div>
              <h2 className='text-lg font-semibold'>Location</h2>
              <p>Unit 4, Durham Workspace</p>
              <p>Abbey Road, Durham DH1 5JZ</p>
            </div>
          </div>
          <div className='flex items-center my-2'>
            <Email className='mr-2' />
            <div>
              <h2 className='text-lg font-semibold'>Email</h2>
              <a href="mailto:hello@ethniceats.co.uk" className='text-blue-500'>hello@ethniceats.co.uk</a>
            </div>
          </div>
          <div className='flex items-center my-2'>
            <Call className='mr-2' />
            <div>
              <h2 className='text-lg font-semibold'>Call</h2>
              <p>0044(0)3331886566</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const ethnicEatsData = [
    {
      question: "How does EthnicEats use AI and machine learning to personalize recommendations?",
      answer: "EthnicEats uses AI and machine learning to analyze your dining history, social media trends, user reviews, and photo content. It learns from your interactions to provide personalized restaurant and cuisine recommendations that adapt to your tastes."
    },
    {
      question: "Can I see why a particular restaurant was recommended to me?",
      answer: "Yes, EthnicEats includes a feature that allows you to view the rationale behind each recommendation. This can include the popularity of the restaurant on social media, positive user reviews, and how it matches your stated preferences and past behavior."
    },
    {
      question: "How frequently is the data updated on EthnicEats?",
      answer: "The platform updates its data in real-time, continually scraping social media and review sites for the latest information. This ensures that recommendations and restaurant details are always current and relevant."
    },
    {
      question: "What are some tips for writing helpful reviews on EthnicEats?",
      answer: "When writing reviews, consider including details about the ambiance, service, and specific dishes you enjoyed. Photos are highly encouraged, as they help other users get a better sense of the dining experience. Be honest and constructive in your feedback to help others make informed decisions."
    },
    {
      question: "How does EthnicEats handle negative reviews or conflicts within the community?",
      answer: "EthnicEats has content moderation tools powered by AI to detect and manage inappropriate content or conflicts. Users can report issues, and our moderation team reviews these reports promptly. We strive to maintain a respectful and supportive community environment."
    },
    {
      question: "How does the interactive culinary map work?",
      answer: "The interactive culinary map utilizes your device's GPS to show nearby ethnic restaurants. You can filter the map by cuisine type, user ratings, and other preferences. Clicking on a restaurant pin provides detailed information, reviews, and booking options."
    }
  ]

const FAQs = () => {
  const [active, setActive] = useState('')
  const handleClick = (index) => {
      if(index === active){
        setActive('')
      } else{
        setActive(index)
      }

      console.log('clicked')
  }
  return(
    <div className='faqs w-full flex justify-center self-center items-center bg-gradient-to-b from-zinc-700 to-stone-700'>
    <div className='overflow-x-hidden overflow-y-hidden w-700px h-800px p-2'>
    <div className='w-full flex flex-col justify-center self-center'>
      <h1 className='text-center text-2xl font-bold my-4 text-white'>FAQs</h1>
      <h1 className='text-center text-white'>Frequently Asked Questions</h1>
      <div className='w-full'>
      {ethnicEatsData.map((qa, index) => (
        <div key={index} className={`w-full flex flex-col my-2 p-4 border-2 transition-transformation duration-1000 rounded ${active === index? 'border-pink-700': ''}`}>
          <div className='flex justify-between items-center'>
            <p className='break-words w-11/12 text-white'>{qa.question}</p>
            <div onClick={() => handleClick(index)} className='hover:cursor-pointer transition-transform duration-1000'>
              {active === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
          </div>
          <div
            className={`overflow-hidden  transition-max-height duration-1000 ease-in-out ${active === index ? 'max-h-40' : 'max-h-0'}`}
          >
            <p className='mt-2 break-words w-full text-left text-white'>{qa.answer}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
    </div>
    </div>
  )
}

const testimonials = [
  {
    names: 'Alex Turner',
    location: 'London',
    testimonial: "EthnicEats transformed my dining adventures! The personalized recommendations are spot on. I’ve discovered so many hidden gems!"
  },
  {
    names: 'Maria Smith',
    location: 'Manchester',
    testimonial: "I love how EthnicEats keeps me updated with the latest food trends. The community is fantastic, and I’ve made great friends who share my passion for ethnic cuisines."
  },
  {
    names: 'Jason Lewis',
    location: 'Birmingham',
    testimonial: "The user reviews are super helpful! I trust EthnicEats to guide me to the best authentic dining spots every time."
  },
  {
    names: 'Samantha Roberts', 
    location: 'Glasgow',
    testimonial: "EthnicEats is a game-changer! The AI recommendations are amazing, and the platform’s easy to use. I’ve never enjoyed eating out this much!"
  },
  {
    names: 'David King',
    location: 'Cardiff',
    testimonial: "Being part of the EthnicEats community is a joy. Sharing photos and experiences with fellow food lovers makes every meal an adventure."
  }
];


const WhyUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const testimonialsCount = testimonials.length;
  const intervalDuration = 5000; // Adjust this value as needed

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsCount);
    }, intervalDuration);
  };

  useEffect(() => {

    const pauseInterval = () => {
      clearInterval(intervalRef.current);
    };

    startInterval();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [testimonialsCount]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    clearInterval(intervalRef.current);
    startInterval();
  };

  return (
    <div className='whyus flex justify-center w-full py-6 md:py-10 lg:py-14 bg-stone-700'>
    <div className='flex flex-col justify-around w-full self-center'>
    <h1 className='text-center text-2xl font-bold my-4 text-white'>WHY CHOOSE US</h1>
      <div className='w-2/3 lg:w-700px flex justify-center self-center '>
      <TestimonialCard testimonial={testimonials[activeIndex]} />
      </div>
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`mx-1 w-3 h-3 rounded-full ${index === activeIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card-container bg-slate-900 p-4 rounded-md shadow-md h-48 py-5">
      <div className='testimonial-card-content'>
      <div className='h-28'>
        <p className="text-lg text-center text-white">{testimonial.testimonial}</p>
      </div>
      <p className="text-sm text-gray-600 mt-2 text-center text-white">{testimonial.names}</p>
      <p className="text-xs text-gray-100 uppercase text-center font-md text-md">{testimonial.location.toUpperCase()}, UK</p>
    </div>
    </div>
  );
};


const Footer = () => {
  let year = moment(new Date()).format('YYYY')
  return(
    <div className='bg-slate-900 w-full flex flex-col justify-center pb-5'>
      <div className='w-full h-full flex justify-center items-center bg-gray-900 text-white py-10'>
        <div className='w-full flex justify-around'>
          <div className='basis-1/3 self-center'>

          <div>
            <h1 className='text-xl font-bold mb-2'>GET STARTED</h1>
            <div>
              <p className='mb-1'>Features</p>
              <p className='mb-1'>Pricing</p>
              <Link to='/register' className='mb-1'>Sign Up</Link>
              <p>FAQs</p>
            </div>
          </div>
          <div>
            <h1 className='text-xl font-bold mb-2'>ABOUT US</h1>
            <p>Interested in a face-to-face discussion? We welcome you to schedule a meeting with us. Please email or phone to arrange a convenient time to visit our office.</p>
          </div>
          </div>
          <div>
          <div>
            <h1 className='text-xl font-bold mb-2'>LEGAL</h1>
            <div className='flex flex-col space-y-1'>
              <Link to='terms_and_conditions'>Terms and conditions</Link>
              <Link to='privacy_policy'>Privacy Policy</Link>
              <Link to='acceptable_use_policy'>Acceptable Use Notice</Link>
            </div>
          </div>
          <div className='basis-1/3 self-center'>
            <div className='flex items-center my-2'>
              <LocationOn className='mr-2' />
              <div>
                <h2 className='text-lg font-semibold'>Location</h2>
                <p>Unit 4, Durham Workspace</p>
                <p>Abbey Road, Durham DH1 5JZ</p>
              </div>
            </div>
            <div className='flex items-center my-2'>
              <Email className='mr-2' />
              <div>
                <h2 className='text-lg font-semibold'>Email</h2>
                <a href="mailto:hello@ethniceats.co.uk" className='text-blue-500'>hello@ethniceats.co.uk</a>
              </div>
            </div>
            <div className='flex items-center my-2'>
              <Call className='mr-2' />
              <div>
                <h2 className='text-lg font-semibold'>Call</h2>
                <p>0044(0)3331886566</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <p className='text-white w-full text-center'>Copyright (c) {year} EthnicEats Ltd. All right reserved</p>
    </div>
  )
}