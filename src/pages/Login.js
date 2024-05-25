import React, { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';
import { useNavigate } from 'react-router-dom';

import { ToastMessage } from '../utils';

export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const auth = useAuth()

    const {setToken, setRefresh, logOut, role} = auth

    useEffect(() => {
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
        console.log(grant)
        if(!grant){
            return
        }else if(grant.error){
            return ToastMessage("error", grant.error)
        } else {
            ApiCall('auth/user/', 'get', grant.token, grant.refresh, setToken, setRefresh)
            .then(function(response){
                if(response.status === 200){
                    console.log(response.data)
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
                return console.log("Someting went wrong")
            })
        }
        return;
    };
  return (
    <section className="h-screen w-full">
        <ToastContainer />
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="/" className="poppins flex text-black items-center mb-6 text-2xl font-semibold">
          EthnicEats   
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="poppins text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleLogin(e)}>
                  <div>
                      <label htmlFor="username" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                      <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" name="username" id="username" className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required></input>
                  </div>
                  <div>
                      <label htmlFor="password" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="••••••••" className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></input>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""></input>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="poppins text-gray-500 dark:text-gray-300 poppins ">Remember me</label>
                          </div>
                      </div>
                      <a href="/" className=" poppins text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <div className='flex items-center flex-col justify around m-auto'>
                  <button type="submit" className="w-full py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins ">Sign in</button>
                  <a href='/' className='poppins text-white text-sm mt-3'>Go back to homepage</a>
                  </div>
                 
                  <p className="text-base text-primary text-center my-6 poppins ">
                      Don’t have an account yet? <a href="/register" className="poppins font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}
