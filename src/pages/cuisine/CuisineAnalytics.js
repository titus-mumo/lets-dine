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
        console.log(cuisines)
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
                console.error("Error occurred:", error.response?.data?.message || "getting cuisines ids");
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
            console.error('Error fetching data:', error)
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
            console.error('Error fetching reviews:', error);
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
                position: 'top'
            },
            title: {
                display: true,
                text: 'Reservations by Date'
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleFont: { size: 16 },
                bodyFont: { size: 14 }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                },
                grid: {
                    color: 'rgba(200,200,200,0.3)'
                }
            },
            x: {
                grid: {
                    color: 'rgba(200,200,200,0.3)'
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutBounce'
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
                position: 'top'
            },
            title: {
                display: true,
                text: 'Distribution of Review Sentiments'
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleFont: { size: 16 },
                bodyFont: { size: 14 }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                },
                grid: {
                    color: 'rgba(200,200,200,0.3)'
                }
            },
            x: {
                grid: {
                    color: 'rgba(200,200,200,0.3)'
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutBounce'
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
<div className="w-full h-full flex justify-around flex-col p-2 lg:pt-0 lg:pl-6">
            {
                loading ? <LoadingSpinner /> :
                <>
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
                                <div key={cuisine.cuisineId} className='w-full md:w-3/4 lg:w-1/2 h-96 mb-6'>
                                    <Bar data={chartData} options={chartOptions} />
                                </div>
                            );
                        })}
                    </div>
                    <div className='flex justify-center w-full'>
                        <p className="text-2xl font-bold mt-4 mb-6">Reviews Analytics</p>
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
                                <div key={cuisine.cuisineId} className='w-full md:w-3/4 lg:w-1/2 h-96 mb-6'>
                                    <Bar data={chartData} options={chartOptionsReviews} />
                                </div>
                            );
                        })}
                    </div>
                </>
            }
        </div>
    );
};
