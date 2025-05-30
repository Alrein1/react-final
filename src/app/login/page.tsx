'use client';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const router = useRouter();
    const handleSubmit = async () => {
        if (email && password) {
            const res = await auth.login(email, password);
            if (res) {
                router.push('/map');
            }
        }
    };
    return (
        <form
            className=""
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <div className="flex">
                <div className="flex flex-col m-1 p-1">
                    <label>Email</label>
                    <label>Password</label>
                </div>
                <div className="flex flex-col m-1 p-1">
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        type="text"
                    />
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                    />
                </div>
            </div>
            <div className="m-1 p-1">
                <button className=" border-2 p-1" type="submit">
                    Login
                </button>
            </div>
        </form>
    );
};

export default Login;
