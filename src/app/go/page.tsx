'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Map, { NavigationControl, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const CoordinatesPage: React.FC = () => {
    const router = useRouter();
    const [viewState, setViewState] = useState({
        longitude: 0,
        latitude: 0,
        zoom: 14
    });

    useEffect(() => {
        if (router.isReady) {
            const { lat, lng } = router.query;
            if (typeof lat === 'string' && typeof lng === 'string') {
                const latitude = parseFloat(lat);
                const longitude = parseFloat(lng);
                if (!isNaN(latitude) && !isNaN(longitude)) {
                    setViewState(prev => ({
                        ...prev,
                        latitude,
                        longitude
                    }));
                }
            }
        }
    }, [router.isReady, router.query]);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                <NavigationControl position="top-right" />
                <Marker
                    longitude={viewState.longitude}
                    latitude={viewState.latitude}
                    color="red"
                />
            </Map>
        </div>
    );
};

export default CoordinatesPage;
