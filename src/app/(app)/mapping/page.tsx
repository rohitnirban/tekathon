'use client';

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import Map, { NavigationControl, Source, Layer, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type PolygonData = {
    type: string;
    geometries: Array<{
        type: string;
        coordinates: number[][][];
    }>;
};

const Page: React.FC = () => {
    const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/satellite-v9');
    const [polygonData, setPolygonData] = useState<PolygonData | null>(null);
    const mapRef = useRef<MapRef>(null);

    useEffect(() => {
        // Replace with the actual path to your JSON file
        fetch('/delhi-water-bodies.json')
            .then(response => response.json())
            .then(data => setPolygonData(data))
            .catch(error => console.error('Error loading polygon data:', error));
    }, []);

    const handleStyleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setMapStyle(event.target.value);
    };

    console.log(polygonData);

    return (
        <div className='w-full h-[70vh]'>
            <div className='absolute z-10 p-3'>
                <select name='map' aria-label='map' onChange={handleStyleChange} value={mapStyle} className='bg-primary text-secondary'>
                    <option value="mapbox://styles/mapbox/satellite-v9">Satellite</option>
                    <option value="mapbox://styles/mapbox/streets-v11">Street</option>
                    <option value="mapbox://styles/mapbox/satellite-streets-v11">Satellite Street</option>
                </select>
            </div>

            <Map
                initialViewState={{
                    longitude: 77.2162867,
                    latitude: 28.7353911,
                    zoom: 12,
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle={mapStyle}
                mapboxAccessToken={MAPBOX_TOKEN}
                ref={mapRef}
            >
                <NavigationControl position="top-right" />

                {polygonData && (
                    <Source id="fences" type="geojson" data={polygonData}>
                        <Layer
                            id="fences-fill"
                            type="fill"
                            paint={{
                                'fill-color': '#0008ff', // Use a simple color to make sure polygons are visible
                                'fill-opacity': 0.6
                            }}
                        />

                        <Layer
                            id="fences-outline"
                            type="line"
                            paint={{
                                'line-color': '#000000', // Black outline for visibility
                                'line-width': 2
                            }}
                        />

                    </Source>
                )}
            </Map>
        </div>
    );
};

export default Page;
