import { useContext, createContext, useState, useEffect } from "react";
import React from "react";


const UserPreferenceContext  = createContext()

const UserPreferenceProvider = ({children}) => {


    const [appetizers, setAppetizers] = useState(sessionStorage.getItem('appetizers') || true)
    const [mainCourses, setMainCourses] = useState(sessionStorage.getItem('mainCourses') || true)
    const [sideDishes, setSideDishes] = useState(sessionStorage.getItem('sideDishes') || true)
    const [desserts, setDesserts] = useState(sessionStorage.getItem('desserts') || true)
    const [beverages, setBeverages] = useState(sessionStorage.getItem('beverages') || true)

    const preferences = {
        appetizers,
        setAppetizers,
        mainCourses,
        setMainCourses,
        sideDishes,
        setSideDishes,
        desserts,
        setDesserts,
        beverages,
        setBeverages
    };


    useEffect(() => {
    }, [appetizers, mainCourses, sideDishes, desserts, beverages]);

    return(
        <UserPreferenceContext.Provider value={preferences}>
            {children}
        </UserPreferenceContext.Provider>
    )
}

export default UserPreferenceProvider;

export const usePreferenceList = () => {
    return useContext(UserPreferenceContext);
}