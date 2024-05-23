import React from 'react';
import { CuisineTabs } from '../../cuisineownercomponents';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { ApiCall } from '../../hooks/ApiCall';
import { useAuth } from '../../hooks/AuthProvider';
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

// Register the necessary components
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
    const userAuth = useAuth();
    const { token, refresh, setToken, setRefresh } = userAuth;

    const getCuisineIds = () => {
        ApiCall('cuisines/owner', 'get', token, refresh, setToken, setRefresh)
            .then(response => {
                if (response.status === 200) {
                    const cuisinePromises = response.data.map(cuisine =>
                        getData(cuisine.cuisine_id).then(data => ({
                            cuisineId: cuisine.cuisine_id,
                            cuisineName: cuisine.name, // assuming the name field is available
                            data
                        }))
                    );
                    Promise.all(cuisinePromises).then(setCuisinesData);
                }
            })
            .catch(error => {
                console.log("Error occurred", error.response?.data?.message || "getting cuisines ids");
            });
    }

    const getData = (id) => {
        return ApiCall(`reservation/cuisine/${id}/`, 'get', token, refresh, setToken, setRefresh)
            .then(response => {
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
                return sortedData.filter(d => dayjs(d.date).isAfter(dayjs(startDate).subtract(1, 'day')));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                window.location.reload()
            });
    };

    useEffect(() => {
        getCuisineIds();
    }, []);

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
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            title: {
                display: true,
                text: 'Reservations by Date'
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="w-full flex justify-around flex-col ">
            <CuisineTabs />
            <p className="text-2xl font-bold mt-4 mb-6">Cuisine Analytics</p>
            <div className="w-full flex justify-around flex-wrap">
                {cuisinesData.map((cuisine, index) => {
                    const chartData = {
                        labels: cuisine.data.map(d => d.date),
                        datasets: [{
                            label: `Number of Reservations for ${cuisine.cuisineName}`,
                            data: cuisine.data.map(d => d.count),
                            backgroundColor: predefinedColors[index % predefinedColors.length],
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
        </div>
    );
};
