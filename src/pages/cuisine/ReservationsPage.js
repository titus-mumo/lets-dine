import React, { useState, useEffect } from 'react';
import { CuisineTabs, ReservationsSection } from '../../cuisineownercomponents';
import { useAuth } from '../../hooks/AuthProvider';
import { ApiCall } from '../../hooks/ApiCall';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LandingPage';
import { ToastMessage } from '../../utils';

export const ReservationsPage = () => {
    const [sideBarNames, setSideBarNames] = useState([]);
    const [cuisineIds, setCuisineIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentId, setCurrentId] = useState('');
    const userAuth = useAuth();
    const { token, refresh, setToken, setRefresh } = userAuth;
    const [active, setActive] = useState('')
    const fetchSideBarNames = async () => {
        try {
            const response = await ApiCall('cuisines/owner/', 'get', token, refresh, setToken, setRefresh);
            if (response && response.status === 200) {
                const names = response.data.map(item => item.name);
                const ids = response.data.map(item => item.cuisine_id);
                setCuisineIds(ids);
                setSideBarNames(names);
                setCurrentId(ids.length > 0? ids[0]: '')
                setActive(ids.length > 0? 0: '')
                setLoading(false);
            }
            else{
                throw new Error(response.data.error)
            }
        } catch (error) {
            return ToastMessage("error", 'Error fetching sidebar names');
        }
    };

    const cuisines = localStorage.getItem("cuisines")
    const navigate = useNavigate()

    useEffect(() => {
        if(cuisines === "false"){
            navigate('/cuisine-owner/new', {state: {cuisines: 0}})
        }
        fetchSideBarNames();
    }, []);

    const handleClick = (cuisineId, index) => {
        setCurrentId(cuisineId); // Update currentId state correctly
        setActive(index)
    };

    

    return (
        <div className='w-full h-full flex justify-around flex-col  pt-2 lg:pt-0 lg:pl-6'>{
            loading? <LoadingSpinner />:(  
            <div className='flex w-full flex-col'>
            <div className='flex flex-row w-full justify-around mx-2'>
            <div className='basis-1/5 flex flex-col'>
                {loading ? <LoadingSpinner /> : sideBarNames.map((cuisineName, index) => (
                    <div key={index} className='tooltip flex flex-col'>
                        <p 
                            onClick={() => handleClick(cuisineIds[index], index)} 
                            className={active === index ? 'poppins text-sm text-blue-500 hover:cursor-pointer' : 'text-sm hover:cursor-pointer poppins'}
                        >
                            {cuisineName.includes(' ') ? `${cuisineName.split(' ')[0]}.. ` : cuisineName.length > 10 ? `${cuisineName.slice(0, 9)}..` : cuisineName}
                        </p>
                        <span className="tooltiptext text-sm">{cuisineName}</span>
                    </div>
                ))}
            </div>
                <div className='basis-4/5 lg:ml-2 flex flex-col justify-start'>
                    <p className='ml-3 text-left text-base'>Reservations for {sideBarNames[active]}</p>
                    <div className='overflow-y-auto overflow-x-auto lg:h-600px lg:w-500px' >
                        <ReservationsSection cuisine_id={currentId} />
                    </div>
                     {/* Pass updated currentId */}
                </div>
            </div>
        </div>)}
        </div>
    );
};
