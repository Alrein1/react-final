import { GpsProvider } from '@/contexts/GpsContext';
import React from 'react';
export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <GpsProvider>{children}</GpsProvider>;
}
