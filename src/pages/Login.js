import React, { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';
import { useNavigate } from 'react-router-dom';

import { ToastMessage } from '../utils';
import LoadingSpinner from './LandingPage';

export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)

    const auth = useAuth()

    const {setToken, setRefresh, logOut, role} = auth

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1500)
        if(role) return logOut()
    }, [])

    const navigate = useNavigate();

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
                    console.log("Unexpected response")
                }
            })
            .catch((error) => {
                return console.log("Something went wrong", error)
            })
        }
        return;
    };
  return (
        <section className="h-screen w-full">
            <ToastContainer />

            {
                loading? <LoadingSpinner />:
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex text-black items-center mb-3 text-lg md:text-xl  font-semibold">
                    EthnicEats   
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-xs md:max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-3 space-y-2 md:space-y-4 sm:p-4">
                        <h1 className="text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-3 md:space-y-5" onSubmit={(e) => handleLogin(e)}>
                            <div>
                                <label htmlFor="username" className="block mb-1 text-xs md:text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                                <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-1 text-xs md:text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
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
