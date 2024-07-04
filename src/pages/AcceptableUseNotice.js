import moment from 'moment';
import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AcceptableUseNotice() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div className="terms-container ">
    
    <div>
    <Header />
      <h1>Acceptable Use Notice</h1>
      <p>
        Welcome to EthnicEats ("we", "us", or "our"). This Acceptable Use Notice
        ("Notice") outlines the terms and conditions governing your use of our
        website and services ("Services"). By accessing or using the Services,
        you agree to be bound by this Notice.
      </p>
      <h2>Acceptable Use</h2>
      <p>You agree to use the Services in a manner that is:</p>
      <ul>
        <li>Lawful and ethical.</li>
        <li>Non-infringing on the intellectual property rights of others.</li>
        <li>Free of hate speech, obscenity, or other offensive content.</li>
        <li>Not used to transmit viruses, malware, or other harmful code.</li>
        <li>Not used to spam or solicit others.</li>
        <li>Not used to impersonate another person or entity.</li>
        <li>Not used to interfere with or disrupt the Services.</li>
      </ul>
      <h2>Prohibited Activities</h2>
      <p>The following activities are expressly prohibited on the Services:</p>
      <ul>
        <li>Attempting to gain unauthorized access to the Services or our systems.</li>
        <li>Engaging in any activity that could damage or disable the Services.</li>
        <li>Collecting or harvesting personal information of other users.</li>
        <li>Using the Services for any illegal or unauthorized purpose.</li>
        <li>Violating any applicable laws or regulations.</li>
      </ul>
      <h2>Enforcement</h2>
      <p>
        We reserve the right to take any action we deem necessary to enforce this
        Notice, including terminating your access to the Services.
      </p>
      <h2>Changes to this Notice</h2>
      <p>
        We may update this Notice from time to time. We will post any changes
        on this page and encourage you to review it periodically.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Notice, please contact us at:
      </p>
      <ul>
        <li>Email: hello@ethniceats.co.uk</li>
      </ul>
      </div>
      <Footer />
    </div>
  );
}

export const Footer = () => {
    let year = moment(new Date()).format('YYYY')
    return(
    <div className='w-full bg-slate-900 rounded-md py-1.5'>
        <p className='text-white w-full text-center'>Copyright (c) {year} EthnicEats Ltd. All right reserved</p>
    </div>
    )
}

export default AcceptableUseNotice;
//TODO: remember the navigation feature like the position of the page in te screen -> scrool to top
//TODO: header for the pages in the footer
export const Header = () => {
    const navigate = useNavigate()
    return(
    <header className='z-10 flex flex-row justify-between shadow-md p-2 header w-full items-center pb-3 rounded-lg' >
        <div className='flex justify-start basis-3/6'>
          <Link to='/' className='poppins text-xl md:text-2xl font-bold text-white hover:cursor-pointer hover:text-blue-500'>EthnicEats</Link>
        </div>
        <div className="flex items-center justify-end space-x-6 pr-2">
        <button className="px-3 lg:px-4 py-0.5 lg:py-1 text-white poppins rounded-md ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105 hover:bg-pink-700 hover:border-pink-700 border-2" onClick={() => navigate('/login')}>Login</button>
        <button className=" bg-primary px-4 py-1 text-white poppins rounded-md ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105 hover:bg-emerald-700 hidden lg:block" onClick={() => navigate('/register')}>Sign Up</button>
        </div>
      </header>
    )
}

