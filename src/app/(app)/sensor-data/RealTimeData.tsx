'use client'

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WaterQualityData {
  pH: number;
  turbidity: number;
  BOD: number;
  NH4: number;
  timestamp: number;
}

const RealTimeData: React.FC = () => {
  const [data, setData] = useState<WaterQualityData[]>([]);

  useEffect(() => {
    // Simulating real-time data updates
    const interval = setInterval(() => {
      // In a real application, you would fetch data from an API here
      const newData: WaterQualityData = {
        pH: Math.random() * 14,
        turbidity: Math.random() * 500,
        BOD: Math.random() * 500,
        NH4: Math.random() * 100,
        timestamp: Date.now(),
      };
      setData(prevData => [...prevData.slice(-19), newData]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const chartData: ChartData<'line'> = {
    labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'pH',
        data: data.map(d => d.pH),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Turbidity',
        data: data.map(d => d.turbidity),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'BOD',
        data: data.map(d => d.BOD),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'NH4',
        data: data.map(d => d.NH4),
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Real-time Water Quality Data',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default RealTimeData;
