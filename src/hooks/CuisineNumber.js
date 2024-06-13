import { useContext, createContext, useState, useEffect } from "react";
import React from "react";
import { ApiCall } from "./ApiCall";
import { useAuth } from "./AuthProvider";

import { useNavigate } from "react-router-dom";

const UserCuisinesContext = createContext()

const UserCuisineProvider = ({children}) => {
    const [number, setNumber] = useState(localStorage.getItem("cuisines") || 0)
    const userAuth = useAuth()
    const {token, refresh, setToken, setRefresh} = userAuth
    const role = localStorage.getItem("role")

    const navigate =useNavigate()

    useEffect(() => {
        if(role === "owner"){
            if(number !== 0 ){
                return
            }else{
            ApiCall('cuisines/owner/', 'get', token, refresh, setToken, setRefresh)
            .then((response) => {
                if(response.status === 200 && response.data.length > 0){
                    localStorage.setItem("cuisines", response.data.length)
                    setNumber(1)
                    return;
                }else{
                    navigate('/cuisine-owner/new', {state: {cuisines: 0}})
                }

            })
            .catch((error) => {
                console.log(error)
            })

            }
        }
    }, [])

    return(
        <UserCuisinesContext.Provider value={number}>
            {children}
        </UserCuisinesContext.Provider>
    )
}

export default UserCuisineProvider;

export const CuisineList = () => {
    return useContext(UserCuisinesContext)
};