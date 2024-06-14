import React from 'react'
import { useState, useEffect } from 'react'
  ;
import 'react-toastify/dist/ReactToastify.css';
import { ToastMessage } from '../utils'
import  axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LandingPage';

require('dotenv').config()

export const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('User')
    const [checkTerms, setCheckTerms] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if(!email.includes('@')){
            return ToastMessage('warning', 'Provide a valid email address')
        }
        if(!username || !email || !password || !confirmPassword){
            return ToastMessage("warning", "Please fill all the fields")
        }

        if(password !== confirmPassword){
            return ToastMessage("warning", "Confirm password is different from password")
        }

        if(!checkTerms){
            return ToastMessage("warning", "Accept the terms and conditions")
        }
        
        setLoading(true)

        if (role === "User"){
            axios.post(process.env.BASE_URL + 'auth/register/', {
                username: username,
                email: email, 
                password: password
            })
            .then(function(response){
                ToastMessage("success" , "Account Registration successful")
                setTimeout(() => navigate('/login'), 3000);
    
            })
            .catch(function(error){
                return ToastMessage('error', error.response? error.response.data['error'] : "An error occured")
            });
        } else if(role === "Cuisine Owner"){
            axios.post(process.env.BASE_URL + 'auth/register/', {
                username: username,
                email: email, 
                password: password,
                role: role
            })
            .then(function(response){
                console.log(response)
                ToastMessage("success" , "Account Registration successful")
                setTimeout(() => navigate('/login'), 3000);
    
            })
            .catch(function(error){
                console.log(error)
                return ToastMessage('error', error.response? error.response.data['error'] : "An error occured" )
            });

        }
        setLoading(false)
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])


  return (
        <section className="h-lvh md:h-full w-full bg-gray-900">
               
            {
                loading? <LoadingSpinner /> : 
                <div className="flex flex-col items-center justify-center px-3 py-4 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex items-center mb-4 text-lg md:text-xl font-semibold text-white poppins">
                    EthnicEats  
                </a>
                <div className="w-300px bg-white rounded-lg shadow dark:border xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-3 space-y-2 md:space-y-4 sm:p-4">
                        <h1 className="text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white poppins">
                            Create an account
                        </h1>
                        <form className="space-y-2 md:space-y-3" onSubmit={(e) => handleRegister(e)}>
                            <div>
                                <label htmlFor="email" className="block mb-1 text-xs md:text-sm font-medium text-gray-900 dark:text-white poppins">Your email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 poppins" 
                                    placeholder="example@gmail.com" 
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="username" className="block mb-1 text-xs md:text-sm font-medium text-gray-900 dark:text-white poppins">Username</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    id="username" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 poppins" 
                                    placeholder="Username" 
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="role" className="block mb-1 text-xs md:text-sm font-medium text-gray-900 dark:text-white poppins">
                                    Role (Create account as: )
                                </label>
                                <select
                                    name="role"
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 poppins"
                                    required
                                >
                                    <option value="User">User</option>
                                    <option value="Cuisine Owner">Cuisine Owner</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-1 text-xs md:text-sm font-medium text-gray-900 dark:text-white poppins">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 poppins" 
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-1 text-xs md:text-sm font-medium text-gray-900 dark:text-white poppins">Confirm password</label>
                                <input 
                                    type="password" 
                                    name="confirm-password" 
                                    id="confirm-password" 
                                    placeholder="••••••••"  
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 poppins" 
                                    required
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input 
                                        id="terms" 
                                        aria-describedby="terms" 
                                        type="checkbox" 
                                        checked={checkTerms} 
                                        onChange={(e) => setCheckTerms(!checkTerms)} 
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 poppins" 
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300 poppins">
                                        I accept the <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a>
                                    </label>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full py-2 bg-blue-600 text-sm text-white font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 mt-4 poppins"
                            >
                                Create an account
                            </button>
                            <p className="text-sm text-gray-500 text-center my-4 dark:text-gray-400 poppins">
                                Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
                            </p>
                            <a href="/" className="block mt-3 text-center text-sm text-gray-500 dark:text-gray-400">Go back to homepage</a>
                        </form>
                    </div>
                </div>
            </div>
            }
            

        </section>

  )
}
