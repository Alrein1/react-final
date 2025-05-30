'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import { useGps } from '@/contexts/GpsContext';
import 'leaflet/dist/leaflet.css';

const RecenterMap = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center]);
    return null;
};

const InvalidateSize = () => {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 200);
    }, []);
    return null;
};

const MapView = () => {
    const gps = useGps();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const polylinePositions: [number, number][] = gps.gpsLocations.map(
        (loc) => [loc.latitude, loc.longitude]
    );
    const center = polylinePositions[0] ?? [59.437, 24.7536];

    if (!mounted) return null;

    return (
        <div className="grow-1 h-full">
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
                <InvalidateSize />
                <Polyline positions={polylinePositions} color="blue" />
            </MapContainer>
        </div>
    );
};

export default MapView;
