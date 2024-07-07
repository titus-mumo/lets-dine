import React, { useEffect } from 'react'
import { useState } from 'react'
  ;
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';
import { useNavigate } from 'react-router-dom';

import { ToastMessage } from '../utils';
import LoadingSpinner from './LandingPage';
import home2 from '../assets/home2.jpg';


//TODO: spacing and just styling
export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)

    const auth = useAuth()

    const {setToken, setRefresh, logOut, role} = auth

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1500)
        const userRole = localStorage.getItem("role")
        if(userRole){
            console.log("hello")
            ToastMessage("info", "You are already logged in!")
            navigate('/home')
        }
    }, [])

    

    const handleLogin = async(e) => {
        e.preventDefault()
        if(password.length < 8){
            return ToastMessage('warning', "Password too short")
        }
        const input = {username: username, password: password}
        const grant = await auth.loginAction(input);
        if(!grant){
            return
        }else if(grant.error){
            return ToastMessage("error", grant.error)
        } else {
            setPassword('')
            setUsername('')
            ApiCall('auth/user/', 'get', grant.token, grant.refresh, setToken, setRefresh)
            .then(function(response){
                if(response.status === 200){
                    if(response.data.groups[0]){
                        localStorage.setItem("role", "owner");
                        setTimeout(() => {navigate('/cuisine-owner/home')}, 1500)
                    }else{
                        localStorage.setItem("role", "user");
                        setTimeout(() => {navigate('/home')}, 1500)
                    }
                }else{
                    ToastMessage("error", "An error occured")
                }
            })
            .catch((error) => {
                ToastMessage(error.message? error.message: "An error occured")
            })
        }
        return;
    };
  return (
    <section className="w-full bg-gray-900 min-h-screen flex items-center justify-center relative">
        {loading ? (
            <LoadingSpinner />
        ) : (
            <div className="flex flex-col items-center justify-center w-full">
                <a href="/" className="flex md:text-white text-gray-900 items-center mb-3 text-2xl md:text-xl font-semibold z-10">
                    EthnicEats
                </a>
                <div className='flex flex-col md:flex-row w-3/4 relative'>
                    <div className="w-full md:w-5/6 lg:w-3/4 bg-white shadow dark:border dark:bg-gray-800 dark:border-gray-700 z-10 relative">
                        <div className="p-3 space-y-2 md:space-y-4 sm:p-4">
                            <h1 className="text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-3 md:space-y-5" onSubmit={(e) => handleLogin(e)}>
                                <div>
                                    <label htmlFor="username" className="block mb-1 text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                                        Your Username
                                    </label>
                                    <input 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        value={username} 
                                        type="text" 
                                        name="username" 
                                        id="username" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Username" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-1 text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <input 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        value={password} 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        placeholder="••••••••" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        required 
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input 
                                                id="remember" 
                                                aria-describedby="remember" 
                                                type="checkbox" 
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" 
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a href="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>
                                <button 
                                    type="submit" 
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? 
                                    <a href="/register" className="ml-2 font-medium text-blue-600 hover:underline dark:text-blue-500">
                                        Sign up
                                    </a>
                                </p>
                                <a href="/" className="block mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                                    Go back to homepage
                                </a>
                            </form>
                        </div>
                    </div>
                    <div className='hidden md:block sm:w-1/2 absolute md:relative top-0 right-0 bottom-0 left-auto'>
                        <img 
                            src={home2} 
                            alt="home" 
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </div>
                <div 
                    className="absolute inset-0 md:hidden bg-cover" 
                    style={{ 
                        backgroundImage: `url(${home2})`, 
                        filter: 'blur(2px)',
                        transform: 'scale(0.8)' 
                    }}
                ></div>
            </div>
        )}
    </section>
    )
};