'use client';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useGps } from '@/contexts/GpsContext';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';

const Home = () => {
    const gps = useGps();

    const RecenterMap = ({ center }: { center: [number, number] }) => {
        const map = useMap();
        useEffect(() => {
            map.setView(center);
        }, [center, map]);
        return null;
    };
    const polylinePositions: [number, number][] = gps.gpsLocations.map(
        (loc) => [loc.latitude, loc.longitude]
    );
    const center = polylinePositions[0] ?? [59.437, 24.7536];

    return (
        <div>
            <div>
                <TopBar />
            </div>
            <div className="flex w-full h-screen">
                <Sidebar />

                <MapContainer
                    center={center}
                    zoom={15}
                    scrollWheelZoom
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <RecenterMap center={center} />
                    <Polyline positions={polylinePositions} color="blue" />
                </MapContainer>
            </div>
        </div>
    );
};

export default Home;
