import React, { useEffect, useState, useRef } from 'react'
import { NavBar } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import AboutSectionImage from '../assets/about-modified.png'
import { LocationOn, Minimize, Remove } from '@mui/icons-material'
import { Email } from '@mui/icons-material'
import { Call } from '@mui/icons-material'
import { Add} from '@mui/icons-material'
import moment from 'moment/moment'
import HomeImage from '../assets/BOSQ.jpg'
import axios from 'axios'
import { ToastMessage } from '../utils'
import { Rating } from 'flowbite-react'
import faqs from '../assets/faqs.webp'

import cover from '../assets/cover.webp'
import cover2 from '../assets/cover2.webp'
import cover3 from '../assets/cover3.webp'
import cover4 from '../assets/cover4.webp'
import cover5 from '../assets/cover5.webp'
import cover6 from '../assets/cover6.webp'
import cover7 from '../assets/cover7.webp'
import cover9 from '../assets/cover9.webp'
import cover10 from '../assets/cover10.webp'
import cover11 from '../assets/cover11.jpg'
import restaurant from '../assets/restaurant.webp'

import burito from '../assets/burito.png'
import burger from '../assets/burger.jpeg'
import bg from '../assets/bg.jpg'
import fries from '../assets/fries.webp'
import home1 from '../assets/home1.jpg';
import home2 from '../assets/home2.jpg';
import testimonial from '../assets/testimonial.jpg'
import { ArrowForward } from '@mui/icons-material'

const images = [home1, home2];

require('dotenv').config()


export const LandingPage = () => {
  const [loading, setLoading] = useState(true)
  const divRefs = useRef({})
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className='relative flex flex-col w-screen justify-center h-full bg-gray-200'>
      {
        loading? <LoadingSpinner /> :
        <>
        <div className='relative'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `url(${images[currentImgIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              filter: 'brightness(0.6)',
              transition: 'all 0.5s ease-in-out',
            }}
          ></div>
            <NavBar divRefs={divRefs} />
            <div className='h-50px'></div>
            <Home divRefs={divRefs} />
        </div>
        <OurStorySection divRefs={divRefs}/>
        <Features divRefs={divRefs} />
        <FAQs divRefs={divRefs} />
        <Pricing divRefs={divRefs} />
        <WhyUs divRefs={divRefs} />
        {/* <RestaurantReservationForm divRefs={divRefs} /> */}
        <Contact divRefs={divRefs} />
        <Footer divRefs={divRefs}/>
        </>

      }

    </div>
  )
}
//TODO: background images navbar/ header and home , animation


//TODO: bACKGROUND IMAGE DIFFERENT, clear, proper wordings --> nb, alternating images, animation

const Home = ({ divRefs }) => {
  return (
    <div
      className='h-screen flex justify-center items-center'
      // style={{
        // backgroundImage: `url(${cover9})`,
        // backgroundSize: 'cover', // Ensure the image covers the entire area
        // backgroundPosition: 'center', // Center the image
        // backgroundRepeat: 'no-repeat', // Avoid image repetition
        // backgroundAttachment: 'fixed', // Optional: Keep the background fixed while scrolling
      // }}
    >
      <div ref={(el) => (divRefs.current['init'] = el)} id='init' className='home flex flex-col lg:flex-row justify-between items-center w-full py-10 md:py-16 lg:py-36'>
        <div className='w-full flex justify-center p-4 flex-col-reverse lg:flex-row absolute'>
          <div className='flex flex-col justify-center w-full h-full basis-3/5 items-center'>
            <h2 className='text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 text-center text-white'>
              EXPLORE. DISCOVER. <span className='text-pink-700'>DINE. </span> SHARE.
            </h2>
            <p className='text-lg lg:text-xl mb-6 text-center text-white'>
              Enjoy authentic dishes from around the globe. Discover new flavors and savor the richness of different cultures.
            </p>
            <div className='flex justify-center'>
              <Link
                to='/login'
                className='font-medium w-auto px-6 py-3 rounded-lg bg-pink-700 hover:bg-pink-800 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary hover:scale-105 text-white'
              >
                GET STARTED
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//TODO proper alignment

const Features = ({divRefs}) => {
  return(
      <div className='about-us bg-white w-full py-10 px-2 md:py-20 lg:py-24'>
        {/* <p className='w-full text-center text-md md:text-lg font-medium mb-4  '>Our mission is to connect food lovers with authentic ethnic cuisines, fostering cultural appreciation and community engagement.</p> */}
        <div className='flex justify-center items-center gap-4 flex-col md:flex-row'>
          <div className='lg:basis-1/5 flex items-center justify-center h-full mb-3 w-1/3 md:mb-0'>
            <div className='w-full h-full self-center flex justify-center'>
              <img src={AboutSectionImage} alt='about image' className='w-200px md:w-300px rotate self-center'></img>
            </div>
          </div>
          <div className='flex flex-col lg:w-2/3 w-full px-2'>
            <h1 className='w-full text-center text-2xl font-bold mt-4 mb-2 lg:mb-4 self-center'>Features</h1>
            <div className='w-full p-2 gap-4 flex items-center justify-center flex-col lg:grid lg:grid-cols-2'>
              <div className='h-full'>
                <h1 className='text-center text-lg font-semibold mb-1'>Personalised Recommendations</h1>
                <p className='leading-relaxed text-left'>Using advanced AI and machine learning algorithms, EthnicEats tailors its recommendations to your unique tastes and preferences. Say goodbye to generic suggestions and hello to a feed that knows your palate better than you do.</p>
              </div>
              <div className='h-full'>
                <h1 className='text-center text-lg font-semibold mb-1'>Social Media Integration</h1>
                <p className='leading-relaxed'>Stay ahead of the trends with our real-time analysis of social media buzz. We scour platforms like Instagram, Twitter, and Facebook to bring you the latest in ethnic dining hotspots, ensuring you’re always in the know.</p>
              </div>
              <div className='h-full'>
                <h1 className='text-center text-lg font-semibold mb-1'>User Reviews and Ratings</h1>
                <p className='leading-relaxed'>Our platform aggregates and analyses reviews from various sources, providing you with a comprehensive view of what others are saying. This helps you make informed dining decisions based on collective experiences.</p>
              </div>
              <div className='h-full'>
                <h1 className='text-center text-lg font-semibold mb-1'>Community Engagement</h1>
                <p className='leading-relaxed'>Join our vibrant community forums to discuss your dining experiences, share photos, and connect with fellow food lovers. EthnicEats fosters a sense of community among users who share a passion for ethnic cuisines.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}


//TODO : Side image comment locationand cotact details -> if you see fit
//TODO: add background image
const Contact = ({divRefs}) => {
  const base_url = process.env.BASE_URL

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')


  const handleContactForm = (e) => {
    e.preventDefault()
    const data = {
      name, 
      email,
      subject,
      message
    }

    axios.post(base_url + 'talk_to_us/', data)
    .then(function(response){
      if(response.status === 201){
        setMessage('')
        setSubject('')
        setEmail('')
        setName('')
        ToastMessage("success", "Message received. We will get back to you shortly.")
      }
    })
    .catch((error) => {
      ToastMessage("error", "Something went wrong")
    });


    
  }
  return(
    <div ref={(el) => (divRefs.current['contact'] = el)} id='contact' className='contact w-full md:py-20 py-24 flex flex-col items-center justify-center'>
      <h1 className='text-center text-2xl font-bold my-4'>CONTACT</h1>
      <div style={{ width: '80%' }} className='flex flex-col lg:flex-row-reverse justify-center items-center lg:h-500px'>
        <div className='px-8 py-8 bg-white h-full flex flex-col items-center justify-center lg:w-2/3 w-full'>
          <h2 className='text-xl font-semibold'>Talk to Us</h2>
          <p className='my-2'>Fill the form below, and we will get back to you as soon as possible</p>
          <form onSubmit={(e) => handleContactForm(e)} className='w-full'>
            <div className='flex flex-col lg:flex-row lg:space-x-2 w-full'>
              <input placeholder='Name*' type='text' className='mt-3 basis-1/2 p-2 border rounded-lg' value={name} onChange={(e) => setName(e.target.value)} required />
              <input placeholder='Email*' type='email' className='mt-3 basis-1/2 p-2 border rounded-lg' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <input placeholder='Subject*' type='text' className='mt-3 p-2 border rounded-lg w-full floating-input' value={subject} onChange={(e) => setSubject(e.target.value)} required /><br />
            <textarea style={{ resize: 'none' }} placeholder='Message*' className='mt-3 p-2 border rounded-lg h-32 w-full' value={message} onChange={(e) => setMessage(e.target.value)} required></textarea><br />
            <div className='w-full flex justify-center'>
              <button type='submit' className='text-center bg-slate-900 py-2 text-white rounded-md shadow-md px-3 mt-2'>Send Message</button>
            </div>
          </form>
        </div>
        <div className='flex flex-col lg:flex-col items-center justify-center px-4 py-8 bg-gray-50 h-full lg:w-1/3 w-full'>
          <div className='flex flex-col lg:gap-12 gap-8'>
            <div className='flex items-center'>
              <LocationOn className='mr-2' />
              <div>
                <h2 className='text-lg font-semibold'>Location</h2>
                <p>Unit 4, Durham Workspace</p>
                <p>Abbey Road, Durham DH1 5JZ</p>
              </div>
            </div>
            <div className='flex items-center'>
              <Email className='mr-2' />
              <div>
                <h2 className='text-lg font-semibold'>Email</h2>
                <a href="mailto:hello@ethniceats.co.uk" className='text-gray-800'>hello@ethniceats.co.uk</a>
              </div>
            </div>
            <div className='flex items-center'>
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
    question: "How does EthnicEats use AI and machine learning to personalise recommendations?",
    answer: "EthnicEats uses AI and machine learning to analyse your dining history, social media trends, user reviews, and photo content. It learns from your interactions to provide personalised restaurant and cuisine recommendations that adapt to your tastes."
  },
  {
    question: "Can I see why a particular restaurant was recommended to me?",
    answer: "Yes, EthnicEats includes a feature that allows you to view the rationale behind each recommendation. This can include the popularity of the restaurant on social media, positive user reviews, and how it matches your stated preferences and past behaviour."
  },
  {
    question: "How frequently is the data updated on EthnicEats?",
    answer: "The platform updates its data in real-time, continually scraping social media and review sites for the latest information. This ensures that recommendations and restaurant details are always current and relevant."
  },
  {
    question: "What are some tips for writing helpful reviews on EthnicEats?",
    answer: "When writing reviews, consider including details about the ambience, service, and specific dishes you enjoyed. Photos are highly encouraged, as they help other users get a better sense of the dining experience. Be honest and constructive in your feedback to help others make informed decisions."
  },
  {
    question: "How does EthnicEats handle negative reviews or conflicts within the community?",
    answer: "EthnicEats has content moderation tools powered by AI to detect and manage inappropriate content or conflicts. Users can report issues, and our moderation team reviews these reports promptly. We strive to maintain a respectful and supportive community environment."
  },
  {
    question: "How does the interactive culinary map work?",
    answer: "The interactive culinary map utilises your device's GPS to show nearby ethnic restaurants. You can filter the map by cuisine type, user ratings, and other preferences. Clicking on a restaurant pin provides detailed information, reviews, and booking options."
  }
]


const FAQs = ({divRefs}) => {
  const [active, setActive] = useState('')
  const handleClick = (index) => {
      if(index === active){
        setActive('')
      } else{
        setActive(index)
      }
  }
  return(
    <div ref={(el) => (divRefs.current['faqs'] = el)} id='faqs' className='faqs w-full flex justify-center self-center items-center pt-10 pb-13 md:py-20 lg:py-24'>
    <div className='p-2'>
    <div className='w-full flex flex-col justify-center self-center'>
      <h1 className='text-center text-2xl font-bold my-4  '>FAQs</h1>
      <h1 className='text-center  '>Get Every Answer</h1>
      <div className='w-full flex flex-col lg:flex-row-reverse p-2 justify-center lg:justify-between lg:items-center'>
      <img src={faqs} alt='faqs' className='w-auto lg:h-300px'></img>
      <div className='w-full md:w-500px lg:w-700px flex flex-col justify-center self-center mt-5 lg:mt-0 lg:mr-10'>
      {ethnicEatsData.map((qa, index) => (
        <div key={index} className={`w-full flex flex-row items-start my-2 p-4 border-2 transition-transformation duration-1000 rounded bg-white ${active === index? 'border-pink-700': ''}`}>
          <div className='flex justify-between items-center'>
          <div onClick={() => handleClick(index)} className='p-1 mr-2 hover:cursor-pointer transition-transform duration-1000 text-bold bg-orange-600 rounded-full'>
              {active === index ? <Remove /> :<Add />}
            </div>
          </div>
          <div>
              <p className='break-words w-11/12   text-sm md:text-base'>{qa.question}</p>
              <div
                className={`overflow-hidden  transition-max-height duration-1000 ease-in-out ${active === index ? 'max-h-40' : 'max-h-0'}`}
              >
                <p className='mt-2 break-words w-full text-left   text-sm'>{qa.answer}</p>
              </div>
          </div>
        </div>
      ))}
      </div>
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
    testimonial: "EthnicEats transformed my dining adventures! The personalised recommendations are spot on. I’ve discovered so many hidden gems!"
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

//TODO: background image extra: animation

const WhyUs = ({divRefs}) => {
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
    <div ref={(el) => (divRefs.current['whyus'] = el)} id='whyus' className='whyus flex self-center justify-center w-full pb-6 md:py-10 lg:py-14 px-4 md:pb-16 lg:pb-20'
     style={{   
      backgroundImage: `url(${testimonial})`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
    }}
  >
    <div className='flex flex-col justify-around w-full self-center'>
    <h1 className='text-center text-2xl font-bold my-4 text-white'>TESTIMONIALS</h1>
      <div className='w-8/9 md:w-2/3 lg:w-700px flex justify-center self-center '>
      <TestimonialCard testimonial={testimonials[activeIndex]} />
      </div>
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`mx-1 w-3 h-3 rounded-full ${index === activeIndex ? 'bg-pink-700' : 'bg-gray-800'}`}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const filled = 5
  return (
    <div className="testimonial-card p-2 md:p-4 rounded-md shadow-md my-5">
      <div className='m-1.5 md:m-2 border-2 border-white p-1'>
        <p className="text-sm text-gray-600 mt-2 text-center">{testimonial.names}</p>
        <p className="text-xs text-gray-100 uppercase text-center font-md text-md">{testimonial.location.toUpperCase()}, UK</p>
        <div className='h-20'>
          <p className="text-sm md:text-base text-center text-white ">{testimonial.testimonial}</p>
        </div>
        <div className='flex w-full justify-center'>
          <Rating>
            <Rating.Star className={`${filled >=1? 'text-yellow-700': ''}`} onClick={() => handleFilled(1, meal_id)}/>
            <Rating.Star className={`${filled >=2? 'text-yellow-700': ''}`} onClick={() => handleFilled(2, meal_id)}/>
            <Rating.Star className={`${filled >=3? 'text-yellow-700': ''}`} onClick={() => handleFilled(3, meal_id)} />
            <Rating.Star className={`${filled >=4? 'text-yellow-700': ''}`} onClick={() => handleFilled(4, meal_id)}/>
            <Rating.Star className={`${filled >=5? 'text-yellow-700': ''}`} onClick={() => handleFilled(5, meal_id)} />
          </Rating>
        </div>
      </div>
    </div>
  );
};

//TODO: make it distinct
const Footer = ({divRefs}) => {

  const handleScrollClick = (targetDivId) => {
      const targetDiv = divRefs.current[targetDivId];
      if (targetDiv) {
        targetDiv.scrollIntoView({ behavior: 'smooth' });
      } else {
        //console.error(`Div with ID "${targetDivId}" not found!`);
      }

  }

  const [email, setEmail] = useState('')

  const handleNewsletter = (e) => {
    e.preventDefault()
    const base_url = process.env.BASE_URL
    if(email.length === 0){
      return ToastMessage("info", "Please enter email address")
    }
    if(!email.includes('@')){
      return ToastMessage("warning", "Invalid email address")
    }
    const data = {email}
    axios.post(base_url + 'subscribe/', data)
    .then(function(response){
      setEmail('')
      if(response.status === 201){
        
        return ToastMessage("success", response.data.message)
      } else if(response.status === 200){
        return ToastMessage("info", response.data.message)
      }

      throw new Error(response.data)
    })
    .catch((error) => {
      ToastMessage("error", error.message? error.message : "Something went wrong")
    });
  }

  let year = moment(new Date()).format('YYYY')
  return(
    <div className='text-neutral-400 bg-neutral-900 w-full flex flex-col justify-center items-center'>
      <div className='h-full flex lg:flex-col justify-center items-center my-4 p-2 w-5/6 py-10'>
      <div className='grid gap-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1'>

        <div className='flex flex-col gap-3'>
          <h1 className='text-base font-bold text-white'>Get Started</h1>
          <div>
            <p className='hover:cursor-pointer' onClick={() => handleScrollClick('about-us')}><ArrowForward /> Features</p>
            <p className='hover:cursor-pointer' onClick={() => handleScrollClick('pricing')}><ArrowForward /> Pricing</p>
            <Link to='/register' className='mb-1'><ArrowForward /> Sign Up</Link>
            <p className='hover:cursor-pointer' onClick={() => handleScrollClick('faqs')}><ArrowForward /> FAQs</p>
          </div>
        </div>
        
        <div className='flex flex-col gap-3'>
          <h1 className='text-base font-bold text-white'>About Us</h1>
          <p>Interested in a face-to-face discussion? We welcome you to schedule a meeting with us. Please email or phone to arrange a convenient time to visit our office.</p>
        </div>
  
        <div className='flex flex-col gap-3'>
          <h1 className='text-base font-bold text-white'>Legal</h1>
          <div className='flex flex-col space-y-1'>
            <Link to='terms_and_conditions/'><ArrowForward /> Terms and conditions</Link>
            <Link to='privacy_policy/'><ArrowForward /> Privacy Policy</Link>
            <Link to='acceptable_use_notice/'><ArrowForward /> Acceptable Use Notice</Link>
          </div>
        </div>
  
        <div className='flex flex-col gap-3'>
          <h1 className='text-base font-bold text-white'>Newsletter</h1>
          <p>Subscribe to our newsletter to get our latest updates & news</p>
          <form onSubmit={(e) => handleNewsletter(e)} className='mt-2 bg-stone-900 rounded-full w-fit flex'>
            <input
              type='email'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='rounded-lg px-1 py-2 bg-white w-fit border-1 border-stone-900'
            />
            <button className='bg-pink-700 rounded-full p-2.5'><ArrowForward /></button>
          </form>
        </div>
      </div>
    </div>
    <p className='w-full text-center text-sm border-t-1 border-neutral-400 py-3'>Copyright (c) {year}  EthnicEats Ltd.  All rights reserved</p>
  </div>
  
  )
}

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
    </div>
  )
}

export default LoadingSpinner;



const Pricing = ({divRefs}) => {
  const [role, setRole] = useState(sessionStorage.getItem('role') || 'User');
  const  [active, setActive] = useState(sessionStorage.getItem('role') || 'User');

  const handleClick = (use) => {
    sessionStorage.setItem('role', use)
    setRole(use)
    setActive(use)

  }

  const activeClass = 'bg-gray-200 text-blue-500 text-sm font-semibold px-2 py-2 text-center'
  const notActiveClass = 'bg-white text-sm px-2 py-2 text-center font-semibold'

  return (
    <div ref={(el) => (divRefs.current['pricing'] = el)} id='pricing' className="pricing w-full flex flex-col py-3 py-5 md:py-20 lg:pt-24 lg:pb-36">
      <h1 className='text-center text-2xl font-bold my-4'>Pricing Plans For Everyone</h1>
      <p className='self-center flex justify-center p-1 items-center bg-white rounded-md'>
        <span className={`w-32 hover:cursor-pointer rounded-md ${active === 'User'? activeClass: notActiveClass}`} onClick={() => handleClick('User')}>User</span>
        <span className={`w-32 hover:cursor-pointer rounded-md ${active === 'Cuisine Owner'? activeClass: notActiveClass}`} onClick={() => handleClick('Cuisine Owner')}>Cuisine Owner</span>
      </p>
      <div className='w-full mt-4'>
        {role === 'User' ? <UserPricing /> : <CuisineOwnerPricing />}
      </div>
    </div>
  );
};

const UserPricing = () => {

  return(
    <div className='flex flex-col lg:flex-row justify-center w-full self-center'>
        <PricingComponent type='Basic'name='Basic' price='0' features={['Personalised recommendations','Add Menu', 'Forums', 'Add Reservations', 'Navigation', 'With Adds']} theme='blue'/>
        <PricingComponent type='Popular' link='https://buy.stripe.com/test_aEUdRq1N4gzB4Xm5kk' name='Standard' price='9.99' features={['Personalised recommendations','Add Menu', 'Forums', 'Add Reservations', 'Navigation', 'Without Adds']} theme='green'/>
    </div>
  )

}

const CuisineOwnerPricing = () => {

  return(
    <div className='flex flex-col lg:flex-row justify-center w-full self-center'>
        <PricingComponent type='Basic' link='https://buy.stripe.com/test_aEUdRq1N4gzB4Xm5kk' name='Standard' price='9.99' features={['Add Cuisine', 'Add Menu', 'Data Analytics', ] } theme='pink'/>
        <PricingComponent type='Popular' link='https://buy.stripe.com/test_bIYeVu8bs6Z175u3cd' name='Professional' price='14.99' features={['Add Cuisine', 'Add Menu',' Data Analytics', 'See Reviews']} theme='blue'/>
        <PricingComponent type='Bundle' link='https://buy.stripe.com/test_7sI00A77ofvx2Pe3ce' name='Elite' price='20.99' features={['Add Cuisine', 'Add Menu', 'Data Analytics', 'See Reviews','Free Adverts']} theme='green'/>
    </div>
  )
}

const PricingComponent = ({type, link, name, price, features, theme}) => {
  const navigate = useNavigate()
  
  return(
    <div className='bg-white mb-5 lg:mx-2 lg:mb-0 rounded-md w-300px h-450px self-center flex flex-col justify-between'>
      <div className='pb-3 mb-4 w-full rounded-md'>
        <div className={`h-40 flex flex-col rounded-t-md justify-center items-center w-full mb-3 ${theme === 'pink'? 'bg-pink-600': theme === 'blue'? 'bg-blue-600': 'bg-green-600'}`}>
        <span className={`bg-white rounded-lg text-sm px-2 inline-block self-center mb-3 ${theme === 'pink'? 'text-pink-600': theme === 'blue'? 'text-blue-600': 'text-green-600'}`}>{type}</span>
        <p className='font-semibold text-md text-white'>{name}</p>
        <p>
          <span className='font-bold text-3xl text-white'>£ {price}/</span> <span className='text-white'>per month</span>
        </p>
        </div>
        <div className='p-1'>
          <ul className='pl-5'>
            {
              features.map((feature, index) => <li key={index} className='list-none'>{feature}</li>)
            }
          </ul>
        </div>
      </div>
      <div className='self-center mb-4 w-full px-4'>
        <p className={`hover:cursor-pointer ${theme === 'pink'? 'text-pink-800': theme === 'blue'? 'text-blue-800': 'text-green-800'} ${theme === 'pink'? 'bg-pink-200': theme === 'blue'? 'bg-blue-200': 'bg-green-200'} text-center rounded-md w-full font-semibold w-full self-center py-2`} onClick={() => {link? window.location.href = link: navigate('/login')}}>
            Get this package
        </p>
      </div>
    </div>
  )
}

//TODO: change our story
const OurStorySection = ({divRefs}) => {
  return (
    <div ref={(el) => (divRefs.current['about-us'] = el)} id='about-us'  className="w-full flex justify-center py-12 px-5 flex-col bg-gray-200">
      <div className='h-100px lg:h-200px'></div>
      <div className="flex flex-col lg:flex-row lg:w-5/6 self-center">
        <div className="flex-1 mb-8 lg:mb-0 lg:mr-12 flex flex-col">
          <div>
            <div className="bg-gray-100 py-1 px-3 rounded inline-block text-sm mb-4">
              Our Story
            </div>
            <h2 className="text-4xl mb-6">
             A joyous eatery inspired by the culture of ethnic cuisines
            </h2>
            <p className="text-lg leading-relaxed mb-6">
                EthnicEats is a cutting-edge digital platform that harnesses 
                the power of AI and machine learning to offer personalized ethnic 
                restaurant recommendations. By analyzing social media trends and 
                user reviews, EthnicEats ensures food enthusiasts and travelers 
                discover diverse, authentic dining experiences, making every meal 
                an adventure.
            </p>
            <div className="flex items-center">
              <img
                src={bg}
                alt="Chef Benaissa Ghrib"
                className="rounded-full w-12 h-12 mr-4"
              />
              <div>
                <h4 className="text-lg m-0">Benaissa Ghrib</h4>
                <p className="text-gray-600 text-sm m-0">Master Chef</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 lg:grid-cols-2 lg:gap-3 self-center">
          <div className='self-center flex flex-col justify-center lg:justify-end items-end'>
            <img
              src={burger}
              alt="Dining setup"
              className="rounded-lg h-200px mb-3 lg:mb-0"
            />
            <img
              src={burito}
              alt="Salad dish"
              className="rounded-lg w-200px lg:self-end"
            />
          </div>
          <div className='mt-3 lg:mt-8'>
            <img
              src={fries}
              alt="Meal and wine"
              className="rounded-lg w-250px mb-3"
            />
            <img
              src={faqs}
              alt="Gourmet dish"
              className="rounded-lg w-300px"
            />
          </div>
        </div>
      </div>
      <div className='h-100px lg:h-250px'></div>
    </div>
  );
};


function RestaurantReservationForm({divRefs}) {
  const [name, setName] = useState('')
  const [persons, setPersons] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  return (
    <div ref={(el) => (divRefs.current['book-table'] = el)} id='book-table'>
      <div className='h-100px lg:h-200px'></div>
    <div className="container w-auto mx-6 md:mx-auto  px-4 py-8 lg:py-8 md:w-3/4 lg:w-3/5 bg-white flex flex-col">
      <h1 className="text-xl font-bold mb-6 text-center lg:pt-6">Book a Table</h1>
      <form className='w-full lg:w-2/3 self-center lg:pb-6'>
      <div className='flex flex-col md:flex-row justify-center'>
      <div className="mb-4 basis-1/2 self-start mr-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 basis-1/2 self-start mr-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        </div>
        <div className='flex flex-col md:flex-row justify-center'>
        <div className="mb-4 basis-1/2 self-start mr-4">
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="000-000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 basis-1/2 self-start mr-4">
          <label htmlFor="persons" className="block text-sm font-medium mb-2">
            Persons
          </label>
          <input
            type="number"
            id="persons"
            className="block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Number of Guests"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            required
          />
        </div>
        </div>
        <div className='flex flex-col md:flex-row justify-center'>
          <div className="mb-4 basis-1/2 self-start mr-4">
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="(ex. mm/dd/yyyy)"
              required
            />
          </div>
          <div className="mb-4 basis-1/2 self-start mr-4">
            <label htmlFor="persons" className="block text-sm font-medium mb-2">
              Time
            </label>
            <input
              type="time"
              id="time"
              className="block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="ex: 7:00pm"
              required
            />
          </div>
        </div>
        <button type="submit" className="inline-flex items-center px-4 py-2 mt-4 bg-indigo-500 text-white font-bold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Start Your Reservation
        </button>
      </form>
    </div>
    </div>
  );
}