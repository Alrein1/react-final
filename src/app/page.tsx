'use client';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/navigation';

/* L.Marker.prototype.options.icon = ; */

const Home = () => {
    const router = useRouter();
    router.push('/map');
    return <div></div>;
};

export default Home;
