import React, { useState, useEffect } from 'react';
import { CuisineTabs } from '../../cuisineownercomponents';
import { Bar } from 'react-chartjs-2';
import { ApiCall } from '../../hooks/ApiCall';
import { useAuth } from '../../hooks/AuthProvider';
import LoadingSpinner from '../LandingPage';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ToastMessage } from '../../utils';

// Register the necessary components for ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const CuisineAnalytics = () => {
    const [cuisinesData, setCuisinesData] = useState([]);
    const [reviewsData, setReviewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, refresh, setToken, setRefresh } = useAuth();

    const reviewLabels = ['negative', 'neutral', 'positive'];
    const cuisines = localStorage.getItem("cuisines")
    const navigate = useNavigate()
    useEffect(() => {
        if(cuisines === "false") {
            return navigate('/cuisine-owner/new', {state: {cuisines: 0}})
        }
        const fetchCuisineData = async () => {
            try {
                const response = await ApiCall('cuisines/owner', 'get', token, refresh, setToken, setRefresh);
                if (response.status === 200) {
                    const cuisinePromises = response.data.map(cuisine =>
                        fetchCuisineDetails(cuisine.cuisine_id, cuisine.name)
                    );

                    const reviewPromises = response.data.map(cuisine =>
                        fetchCuisineReviews(cuisine.cuisine_id, cuisine.name)
                    );

                    const cuisines = await Promise.all(cuisinePromises);
                    const reviews = await Promise.all(reviewPromises);

                    setCuisinesData(cuisines);
                    setReviewsData(reviews);
                    setLoading(false)
                }
            } catch (error) {
                //console.error("Error occurred:", error.message?.data?.message || "getting cuisines ids");
                //TODO
            }
        };

        fetchCuisineData();
    }, [token, refresh, setToken, setRefresh]);

    const fetchCuisineDetails = async (id, name) => {
        try {
            const response = await ApiCall(`reservation/cuisine/${id}/`, 'get', token, refresh, setToken, setRefresh);
            const reservations = response.data;

            const counts = reservations.reduce((acc, curr) => {
                const date = dayjs(curr.time).format('YYYY-MM-DD');
                acc[date] = (acc[date] || 0) + 1;
                return acc;
            }, {});

            const sortedData = Object.keys(counts)
                .sort((a, b) => dayjs(a).diff(dayjs(b)))
                .map(date => ({ date, count: counts[date] }));


            const startDate = dayjs().format('YYYY-MM-DD');
            const filteredData = sortedData.filter(d => dayjs(d.date).isAfter(dayjs(startDate).subtract(1, 'day')));

            return { cuisineId: id, cuisineName: name, data: filteredData };
        } catch (error) {
            return ToastMessage("error", error.message? error.message || "Something went wrong": "An error occured fetching analytics")
        }
    };

    const fetchCuisineReviews = async (id, name) => {
        try {
            const response = await ApiCall(`reviews/${id}/`, 'get', token, refresh, setToken, setRefresh);
            
            const reviews = response.data;

            const categorizedReviews = reviews.reduce((acc, review) => {
                if (review.score > 0.3) {
                    acc.positive++;
                } else if (review.score < -0.3) {
                    acc.negative++;
                } else {
                    acc.neutral++;
                }
                return acc;
            }, { negative: 0, neutral: 0, positive: 0 });

            return { cuisineId: id, cuisineName: name, data: categorizedReviews };
        } catch (error) {
            return ToastMessage("error", error.message? error.message || "Something went wrong": "An error occured fetching analytics")
        }
    };


    const predefinedColors = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(99, 255, 132, 0.8)',
        'rgba(162, 54, 235, 0.8)',
        'rgba(206, 255, 86, 0.8)',
        'rgba(192, 75, 192, 0.8)',
        'rgba(102, 153, 255, 0.8)',
        'rgba(159, 255, 64, 0.8)'
    ];

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: 'white' // Set legend text color to white
                }
            },
            title: {
                display: true,
                text: 'Reservations by Date',
                color: 'white' // Set title color to white
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleFont: { size: 16, color: 'white' }, // Set tooltip title font color to white
                bodyFont: { size: 14, color: 'white' } // Set tooltip body font color to white
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                    color: 'white' // Set y-axis ticks color to white
                },
                grid: {
                    color: 'rgba(200,200,200,0.3)'
                }
            },
            x: {
                ticks: {
                    color: 'white',
                    callback: function(value) {
                        let label = this.getLabelForValue(value);
                        return label.split(' ').join('\n'); // Break words on space
                    }// Set x-axis ticks color to white
                },
                grid: {
                    color: 'rgba(200,200,200,0.3)'
                }
            }
        },
        animation: {
            duration: 2000,
        },
        elements: {
            bar: {
                borderRadius: 10,
                borderSkipped: false
            }
        }
    };
    
    const chartOptionsReviews = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: 'white' // Set legend text color to white
                }
            },
            title: {
                display: true,
                text: 'Distribution of Review Sentiments',
                color: 'white' // Set title color to white
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleFont: { size: 16, color: 'white' }, // Set tooltip title font color to white
                bodyFont: { size: 14, color: 'white' } // Set tooltip body font color to white
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                    color: 'white' // Set y-axis ticks color to white
                },
                grid: {
                    color: 'rgba(200,200,200,0.3)'
                }
            },
            x: {
                ticks: {
                    color: 'white',
                    callback: function(value) {
                        let label = this.getLabelForValue(value);
                        return label.split(' ').join('\n'); // Break words on space
                    } // Set x-axis ticks color to white
                },
                grid: {
                    color: 'rgba(200,200,200,0.3)'
                }
            }
        },
        animation: {
            duration: 2000,
        },
        elements: {
            bar: {
                borderRadius: 10,
                borderSkipped: false,
                backgroundColor: 'gray'
            }
        }
    };

    return (
<div className="w-full h-full flex justify-around flex-col md:m-2 lg:mt-0 lg:ml-6">
            {
                loading ? <LoadingSpinner /> :
                <>
                    <div className='w-full bg-cyan-400 my-2 rounded-md'>
                    <div className='flex justify-center w-full'>
                        <p className="text-2xl font-bold mt-4 mb-6">Reservation Analytics</p>
                    </div>
                    <div className="w-full flex justify-around flex-wrap">
                        {cuisinesData.map((cuisine, index) => {
                            const chartData = {
                                labels: cuisine.data.map(d => d.date),
                                datasets: [{
                                    label: `Number of Reservations for Cuisine ${cuisine.cuisineName}`,
                                    data: cuisine.data.map(d => d.count),
                                    backgroundColor: cuisine.data.map((_, i) => predefinedColors[i % predefinedColors.length]),
                                    borderColor: predefinedColors[index % predefinedColors.length].replace('0.8', '1'),
                                    borderWidth: 1
                                }]
                            };

                            return (
                                <div key={cuisine.cuisineId} className='w-full lg:w-2/5 h-96 mb-6 border-1 shadow-sm border-gray-300 bg-gray-700 rounded-md mx-2 p-1'>
                                    <Bar data={chartData} options={chartOptions} className='border-1 border-gray-900' />
                                </div>
                            );
                        })}
                    </div>
                    </div>
                    <div className='w-full bg-gray-300 my-2 rounded-md'>
                    <div className='flex justify-center w-full '>
                        <p className="text-2xl font-bold mt-4 mb-4">Reviews Analytics</p>
                    </div>
                    <div className="w-full flex justify-around flex-wrap">
                        {reviewsData.map((cuisine, index) => {
                            const chartData = {
                                labels: reviewLabels.map(label => label),
                                datasets: [{
                                    label: `Reviews for ${cuisine.cuisineName}`,
                                    data: cuisine.data,
                                    backgroundColor: predefinedColors[index],
                                    borderColor: predefinedColors[index % predefinedColors.length].replace('0.8', '1'),
                                    borderWidth: 1
                                }]
                            };

                            return (
                                <div key={cuisine.cuisineId} className='w-full lg:w-2/5 h-96 my-2 border-1 shadow-sm border-gray-300 bg-gray-700 rounded-md md:mx-2 p-1'>
                                    <Bar data={chartData} options={chartOptionsReviews} />
                                </div>
                            );
                        })}
                    </div>
                    </div>
                </>
            }
        </div>
    );
};
