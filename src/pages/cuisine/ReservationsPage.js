import React, { useState, useEffect } from 'react';
import { CuisineTabs, ReservationsSection } from '../../cuisineownercomponents';
import { useAuth } from '../../hooks/AuthProvider';
import { ApiCall } from '../../hooks/ApiCall';

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
            if (response.status === 200) {
                const names = response.data.map(item => item.name);
                const ids = response.data.map(item => item.cuisine_id);
                setCuisineIds(ids);
                setSideBarNames(names);
                setCurrentId(ids.length > 0? ids[0]: '')
                setActive(ids.length > 0? 0: '')
                setLoading(false);
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
            <div className='flex w-full flex-col'>
            <CuisineTabs />
            <div className='flex flex-row w-full justify-around'>
                <div className='basis-1/5'>
                    {loading ? 'Loading...' : sideBarNames.map((item, index) => (
                        <p key={index} onClick={() => handleClick(cuisineIds[index], index)} className={active === index? 'poppins text-lg font-bold':'poppins'}>
                            {item}
                        </p>
                    ))}
                </div>
                <div className='basis-4/5'>
                    <p>Reservations for {sideBarNames[active]}</p>
                    <ReservationsSection cuisine_id={currentId} /> {/* Pass updated currentId */}
                </div>
            </div>
        </div>)}
        </div>
    );
};
