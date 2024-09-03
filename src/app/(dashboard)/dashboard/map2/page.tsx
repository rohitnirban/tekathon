'use client'

import React, { useState, useEffect } from 'react';
import Map, { NavigationControl, MapRef, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import { Drawer, DrawerHeader, DrawerTitle, DrawerFooter, DrawerContent } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Page: React.FC = () => {
    const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v11');
    const [geojsonData, setGeojsonData] = useState<any>(null);
    const [selectedFeature, setSelectedFeature] = useState<Feature<Geometry, GeoJsonProperties> | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const mapRef = React.useRef<MapRef>(null);

    useEffect(() => {
        async function fetchGeoJSON() {
            try {
                // Fetch the GeoJSON data from the public folder
                const response = await axios.get('/abc.json');
                setGeojsonData(response.data);
            } catch (error) {
                console.error('Error fetching GeoJSON data:', error);
            }
        }

        fetchGeoJSON();
    }, []);

    const handleMapClick = (event: any) => {
        const features = event?.features || [];

        if (features.length === 0) {
            setSelectedFeature(null);
            setDrawerOpen(false);
            return;
        }

        const clickedFeature = features.find((feature: any) => feature.layer.id.startsWith('geojson-layer'));
        setSelectedFeature(clickedFeature || null);
        setDrawerOpen(true);
    };

    return (
        <div className='w-full h-full'>
            <Map
                initialViewState={{
                    longitude: 77.2141,
                    latitude: 28.6110,
                    zoom: 12,
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle={mapStyle}
                mapboxAccessToken={MAPBOX_TOKEN}
                ref={mapRef}
                onClick={handleMapClick}
            >
                <NavigationControl position="top-right" />

                {/* Add GeoJSON Data */}
                {geojsonData && (
                    <Source id="geojson-data" type="geojson" data={geojsonData}>
                        {geojsonData.features.map((feature: Feature, index: number) => (
                            <Layer
                                key={index}
                                id={`geojson-layer-${index}`}
                                type="fill"
                                paint={{
                                    'fill-color': feature.properties?.color ?? '#888888',
                                    'fill-opacity': 0.4
                                }}
                                beforeId="waterway-label" // Ensure it renders on top of existing layers
                            />
                        ))}
                    </Source>
                )}
            </Map>

            {/* ShadCN Drawer for Selected Feature Properties */}
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <DrawerHeader>
                    <DrawerTitle>Water Body Details</DrawerTitle>
                </DrawerHeader>
                <DrawerContent>
                    {selectedFeature ? (
                        <>
                            <h3 className="font-semibold">{selectedFeature.properties?.name ?? 'Unknown'}</h3>
                            <p><strong>Type:</strong> {selectedFeature.properties?.type ?? 'N/A'}</p>
                            <p><strong>Color:</strong> {selectedFeature.properties?.color ?? 'N/A'}</p>
                            <p><strong>Area (sqm):</strong> {selectedFeature.properties?.area_sqm ?? 'N/A'}</p>
                            <p><strong>Depth (m):</strong> {selectedFeature.properties?.depth_m ?? 'N/A'}</p>
                            <p><strong>Last Updated:</strong> {selectedFeature.properties?.last_updated ?? 'N/A'}</p>
                        </>
                    ) : (
                        <p>No feature selected</p>
                    )}
                </DrawerContent>
                <DrawerFooter>
                    <Button onClick={() => setDrawerOpen(false)}>Close</Button>
                </DrawerFooter>
            </Drawer>
        </div>
    );
};

export default Page;
