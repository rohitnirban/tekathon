'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Map, { NavigationControl, Source, Layer, MapRef, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import FencedDrawer from './components/FencedDrawer'; // Adjust the path if needed

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type MarkerPosition = [number, number] | null;

const Page: React.FC = () => {
    const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v11');
    const [fences, setFences] = useState<any[]>([]);
    const [selectedFence, setSelectedFence] = useState<any>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [markerPosition, setMarkerPosition] = useState<MarkerPosition>(null);

    const mapRef = React.useRef<MapRef>(null);

    const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMapStyle(event.target.value);
    };

    useEffect(() => {
        const fetchFences = async () => {
            const response = await fetch('/fences.json');
            const data = await response.json();
            setFences(data);
        };

        fetchFences();
    }, []);

    const getFencesGeoJSON = () => {
        return {
            type: 'FeatureCollection',
            features: fences.map(fence => ({
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [fence.coordinates]
                },
                properties: {
                    name: fence.name,
                    id: fence.id || '',
                    location: fence.location,
                    area: fence.area,
                    depth: fence.depth,
                    nearSlum: fence.nearSlum,
                    wqi: fence.wqi,
                    pH: fence.pH,
                    ammoniaLevel: fence.ammoniaLevel,
                    o2Level: fence.o2Level,
                    bioDiversity: fence.bioDiversity,
                    riskFactor: fence.riskFactor,
                    alert: fence.alert,
                    precaution: fence.precaution
                }
            }))
        };
    };

    const handleMapClick = useCallback((event: any) => {
        const features = mapRef.current?.queryRenderedFeatures(event.point);

        if (features && features.length > 0) {
            const feature = features[0];
            setSelectedFence(feature.properties);
            setDrawerOpen(true);
        }
    }, []);

    const handleCoordinateClick = useCallback((lat: number, lng: number) => {
        setMarkerPosition([lng, lat]);
        setDrawerOpen(false);
        mapRef.current?.flyTo({ center: [lng, lat], zoom: 17 });
    }, []);

    return (
        <div className='w-full h-full'>
            <div className='absolute z-10 p-3'>
                <select name='map' aria-label='map' onChange={handleStyleChange} value={mapStyle} className='bg-primary text-secondary'>
                    <option value="mapbox://styles/mapbox/streets-v11">Street</option>
                    <option value="mapbox://styles/mapbox/satellite-v9">Satellite</option>
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
                onClick={handleMapClick}
                ref={mapRef}
            >
                <NavigationControl position="top-right" />

                {fences.length > 0 && (
                    <Source id="fences" type="geojson" data={getFencesGeoJSON()}>
                        <Layer
                            id="fences-fill"
                            type="fill"
                            paint={{
                                'fill-color': [
                                    'match',
                                    ['get', 'riskFactor'],
                                    'high', '#ff0000', // Red for high risk
                                    'moderate', '#ffff00', // Yellow for moderate risk
                                    'low', '#00ff00', // Green for low ris
                                    '#808080' // Default grey if no match
                                ],
                                'fill-opacity': 0.4
                            }}
                        />

                        <Layer
                            id="fences-outline"
                            type="line"
                            paint={{
                                'line-color': [
                                    'case',
                                    ['==', ['get', 'nearSlum'], true], '#ff0000', // Red border if near slum
                                    '#00ff00' // Green border otherwise
                                ],
                                'line-width': 2
                            }}
                        />

                        <Layer
                            id="fences-label"
                            type="symbol"
                            layout={{
                                'text-field': '{name}',
                                'text-font': ['Open Sans Regular'],
                                'text-size': 12
                            }}
                            paint={{
                                'text-color': mapStyle.includes('satellite') ? '#ffffff' : '#000000' // White text on satellite, black on other styles
                            }}
                        />
                    </Source>
                )}

            </Map>
            <FencedDrawer
                open={drawerOpen}
                fence={selectedFence}
                onClose={() => setDrawerOpen(false)}
                onCoordinateClick={handleCoordinateClick}
            />
        </div>
    );
};

export default Page;
