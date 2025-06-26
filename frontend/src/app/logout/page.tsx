"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('user');

        router.push('/');
    }, []);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default LogoutPage;