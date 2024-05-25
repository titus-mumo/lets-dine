import React, { useState, useEffect } from 'react';
import { CuisineTabs, ReservationsSection } from '../../cuisineownercomponents';
import { useAuth } from '../../hooks/AuthProvider';
import { ApiCall } from '../../hooks/ApiCall';
import { useNavigate } from 'react-router-dom';

export const ReservationsPage = () => {
    const [sideBarNames, setSideBarNames] = useState([]);
    const [cuisineIds, setCuisineIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentId, setCurrentId] = useState('');
    const userAuth = useAuth();
    const { token, refresh, setToken, setRefresh } = userAuth;
    const [active, setActive] = useState('')

    const navigate = useNavigate()

    const fetchSideBarNames = async () => {
        try {
            const response = await ApiCall('cuisines/owner/', 'get', token, refresh, setToken, setRefresh, navigate);
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
                navigate('/login')
            }
        } catch (error) {
            console.error('Error fetching sidebar names:', error);
        }
    };

    useEffect(() => {
        fetchSideBarNames();
    }, []);

    const handleClick = (cuisineId, index) => {
        setCurrentId(cuisineId); // Update currentId state correctly
        setActive(index)
    };

    return (
        <div className='w-full'>{
            loading? 'Loading':(  
            <div className='flex w-full flex-col mt-3'>
            <CuisineTabs />
            <div className='flex flex-row w-full justify-around mx-2'>
                <div className='basis-1/5'>
                    {loading ? 'Loading...' : sideBarNames.map((item, index) => (
                        <p key={index} onClick={() => handleClick(cuisineIds[index], index)} className={active === index? 'poppins text-blue-500 hover:cursor-pointer':'hover:cursor-pointer poppins'}>
                            {item}
                        </p>
                    ))}
                </div>
                <div className='basis-4/5 lg:ml-2 flex flex-col justify-start'>
                    <p className='ml-3 text-left'>Reservations for {sideBarNames[active]}</p>
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
