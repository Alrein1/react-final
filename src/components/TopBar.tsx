import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useGps } from '@/contexts/GpsContext';

export const TopBar = () => {
    const auth = useAuth();
    const gps = useGps();
    const router = useRouter();
    return (
        <div className="flex justify-between max-w-full border-2 border-white">
            <div className="flex ml-4 justify-start">
                {auth.user ? (
                    <button
                        className="border-2 p-1 rounded hover:border-cyan-400"
                        onClick={() => {
                            gps.setOnlyUserSessions(!gps.onlyUserSessions);
                        }}
                    >
                        {gps.onlyUserSessions
                            ? 'Show all sessions'
                            : 'Show only my sessions'}
                    </button>
                ) : (
                    ''
                )}
            </div>
            <div className="flex pr-4 justify-end">
                {!auth.user ? (
                    <div>
                        <button
                            className="border-2 p-1 rounded hover:border-cyan-400"
                            onClick={() => {
                                router.push('/register');
                            }}
                        >
                            Register
                        </button>
                        <button
                            className="border-2 p-1 rounded hover:border-cyan-400"
                            onClick={() => {
                                router.push('/login');
                            }}
                        >
                            Login
                        </button>
                    </div>
                ) : (
                    <button
                        className="border-2 p-1 rounded hover:border-cyan-400"
                        onClick={() => {
                            auth.logout();
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};
