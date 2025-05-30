'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import { useGps } from '@/contexts/GpsContext';

const RecenterMap = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center]);
    return null;
};

const MapView = () => {
    const gps = useGps();

    const polylinePositions: [number, number][] = gps.gpsLocations.map(
        (loc) => [loc.latitude, loc.longitude]
    );
    const center = polylinePositions[0] ?? [59.437, 24.7536];

    return (
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
    );
};

export default MapView;
