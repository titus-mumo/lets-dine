import { useContext, createContext, useState, useEffect } from "react";
import React from "react";


const UserPreferenceContext  = createContext()

const UserPreferenceProvider = ({children}) => {
    const [appetizers, setAppetizers] = useState(true)
    const [mainCourses, setMainCourses] = useState(true)
    const [sideDishes, setSideDishes] = useState(true)
    const [desserts, setDesserts] = useState(true)
    const [beverages, setBeverages] = useState(true)

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