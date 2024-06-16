import React, { useEffect, useState } from 'react'
import { ToastMessage } from '../utils'
  
import 'react-toastify/dist/ReactToastify.css';
import { ApiCall } from '../hooks/ApiCall';
import { useAuth } from '../hooks/AuthProvider';
import { ReservatinDetail } from '../components/ReservatinDetail';
import { Link } from 'react-router-dom';
import { CuisineTabs } from '../cuisineownercomponents';
import LoadingSpinner from './LandingPage';

export const ViewReservations = () => {

    const [userReservations, setUserReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [reservationId, setReservationId] = useState('');

    const user = useAuth();
    const { token, refresh, setToken, setRefresh } = user;

    if (!token) return ToastMessage("error", "Ooops! You are not logged in");

    const fetchUserSpecificReservations = () => {
        ApiCall('reservation/user', 'get', token, refresh, setToken, setRefresh)
            .then(response => {
                const { status, data } = response;
                if (status === 200) {
                    const reservationsGroupedByCuisine = groupReservationsByCuisine(data);
                    fetchCuisineNames(reservationsGroupedByCuisine);
                }
            })
            .catch(error => {
                return error.message ? error.message : "An error occurred";
            });
    };

    const groupReservationsByCuisine = (reservations) => {
        return reservations.reduce((acc, reservation) => {
            const { cuisine } = reservation;
            if (!acc[cuisine]) {
                acc[cuisine] = [];
            }
            acc[cuisine].push(reservation);
            return acc;
        }, {});
    };

    const fetchCuisineNames = (reservationsGroupedByCuisine) => {
        const cuisineIds = Object.keys(reservationsGroupedByCuisine);
        Promise.all(cuisineIds.map(cuisineId => ApiCall(`cuisines/${cuisineId}`, 'get', token, refresh, setToken, setRefresh)))
            .then(responses => {
                responses.forEach((response, index) => {
                    const { status, data } = response;
                    if (status === 200) {
                        const cuisineName = data.name;
                        reservationsGroupedByCuisine[cuisineIds[index]].forEach(reservation => {
                            reservation.cuisineName = cuisineName;
                        });
                    }
                });
                setUserReservations(Object.values(reservationsGroupedByCuisine).flat());
                setLoading(false);
            })
            .catch(error => {
                return ToastMessage("error", error.message ? error.message : "An error occurred");
            });
    };

    useEffect(() => {
        fetchUserSpecificReservations();
    }, []);

  return (
        <div className='flex flex-col justify-center self-start w-full mt-10 lg:mt-0 pt-2 lg:pt-0 px-2 w-full md:px-3 lg:px-4 '>
            {
                loading? <LoadingSpinner />:
                <div className='flex flex-col justify-center items-center w-full'>
                <p className='font-bold text-md md:text-lg poppins text-center'>Reservations Made</p>
                <div className='overflow-y-auto overflow-x-hidden w-full md:w-5/6 lg:h-600px lg:w-700px text-center'>
                    {userReservations.length > 0 ? (
                        userReservations.map((item) => 
                            <ReservatinDetail key={item.reservation_id} reservation={item} setReservationId={setReservationId} setConfirmDelete={setConfirmDelete} reservationId={reservationId} />
                        )
                    ) : (
                        <p className='poppins my-20'>Reservations made will appear here</p>
                    )}
                </div>
                <DeletePopUp confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} deleteReservationId={reservationId} />
                <Link to='/home' className='m-auto px-3 py-1.5 md:py-2 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-1 mt-3 rounded-lg transition duration-300 poppins'>Go back home</Link>
            </div>

            }

        </div>

  )
}



const DeletePopUp = ({confirmDelete, setConfirmDelete, deleteReservationId}) => {

    const userAuth = useAuth()
    const {token, refresh, setToken, setRefresh} = userAuth

    const handleDeleteReservation = (e)=> {
        e.preventDefault()
        ApiCall(`reservation/${deleteReservationId}/`, 'delete', token, refresh, setToken, setRefresh)
        .then(function(response){
            const {status, data} = response
            if(status === 200){
                ToastMessage("success", data.message)
                setConfirmDelete(false)
                setTimeout(() => {window.location.reload()}, 1000)
                return;
            }else{
                throw new Error(response.data.error)
            }
        })
        .catch((error) => {
            return ToastMessage("error", error.message || "Something went wrong")
        })
    }

    return(
        <div className={`${confirmDelete ? 'flex blur-none' : 'hidden'} z-10000 fixed inset-0 justify-center items-center`}>
            <div className='p-2 bg-slate-900 rounded shadow-md'>
                <p className='text-sm md:text-md text-white'>Do you want to delete this reservation?</p>
                <div className='flex justify-around mt-1'>
                    <button onClick={(e) => handleDeleteReservation(e)} className='text-md text-white'>Yes</button>
                    <button onClick={() => setConfirmDelete(false)} className='text-md text-white'>No</button>
                </div>
            </div>
        </div>
    )
}
