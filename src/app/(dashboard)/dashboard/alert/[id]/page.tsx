'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Map from './components/Map'; // Adjust the import path if necessary

const alerts = [
  {
    id: '1',
    title: 'Contamination Alert',
    message: 'High levels of ammonia detected in Yamuna River near Location X. Immediate action required. Water quality: Hazardous.',
    latitude: 28.7041,  // Example coordinates
    longitude: 77.1025,
  },
  {
    id: '2',
    title: 'Routine Cleaning Completed',
    message: 'Desilting and cleaning activities successfully completed at Water Body Y. Water quality improved by 15%.',
    latitude: 28.5355,  // Example coordinates
    longitude: 77.3910,
  },
  // Add more alert objects with coordinates here
];

const AlertDetails = () => {
  const { id } = useParams();
  const [alert, setAlert] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const foundAlert = alerts.find(alert => alert.id === id);
      setAlert(foundAlert || null);
    }
  }, [id]);

  if (!alert) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{alert.title}</h1>
      <p className="mt-2">{alert.message}</p>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Location</h2>
        <Map latitude={alert.latitude} longitude={alert.longitude} />
      </div>
    </div>
  );
};

export default AlertDetails;
