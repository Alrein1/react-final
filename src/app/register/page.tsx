'use client';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const router = useRouter();
    const auth = useAuth();
    const handleSubmit = async () => {
        if (email && password && firstName && lastName) {
            const res = await auth.register(
                email,
                password,
                firstName,
                lastName
            );
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
                    <label>First name</label>
                    <label>Last name</label>
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
                    <input
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        type="text"
                    />
                    <input
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        type="text"
                    />
                </div>
            </div>
            <div className="m-1 p-1">
                <button className=" border-2 p-1" type="submit">
                    Register
                </button>
            </div>
        </form>
    );
};

export default Register;
