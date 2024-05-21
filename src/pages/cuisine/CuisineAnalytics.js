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
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const userAuth = useAuth();
    const { token, refresh, setToken, setRefresh } = userAuth;

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

    const getData = async () => {
        ApiCall('reservation/cuisine/3/', 'get', token, refresh, setToken, setRefresh)
            .then(function (response) {
                console.log('Fetched data:', response.data);
                const reservations = response.data;
                const counts = reservations.reduce((acc, curr) => {
                    const date = dayjs(curr.time).format('YYYY-MM-DD');
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {});

                const sortedData = Object.keys(counts)
                    .sort((a, b) => dayjs(a).diff(dayjs(b)))
                    .map(date => ({ date, count: counts[date] }));

                console.log('Processed and sorted data:', sortedData);

                const startDate = dayjs().format('YYYY-MM-DD');
                const filteredData = sortedData.filter(d => dayjs(d.date).isAfter(dayjs(startDate).subtract(1, 'day')));

                setLabels(filteredData.map(d => d.date));
                setData(filteredData.map(d => d.count));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Number of Reservations',
            data: data,
            backgroundColor: predefinedColors,
            borderColor: predefinedColors.map(color => color.replace('0.8', '1')),
            borderWidth: 1
        }]
    };

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
            <div className="w-full h-96 flex justify-around flex-wrap">
                <div className='w-full md:w-3/4 lg:w-1/2 h-96 '>
                    <Bar data={chartData} options={chartOptions} />
                </div>
                
            </div>
        </div>
    );
};
