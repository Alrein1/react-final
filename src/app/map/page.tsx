'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';

const MapView = dynamic(() => import('@/components/MapView'), {
    ssr: false,
});

const Home = () => {
    return (
        <div>
            <TopBar />
            <div className="flex w-full h-screen">
                <Sidebar />
                <MapView />
            </div>
        </div>
    );
};

export default Home;
