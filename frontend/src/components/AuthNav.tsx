import { Link } from '@chakra-ui/core';
import React from 'react';
import {
    destroyAuthInfo,
    isAuthenticated
} from '../services/authentication.service';
import { useRouter } from 'next/router';

export const AuthNav: React.FC<any> = () => {
    const logout = () => {
        destroyAuthInfo();
        useRouter().push('/');
    };
    return isAuthenticated() ? (
        <>
            <Link href={'/logout'} onClick={logout} padding={2} color={'white'}>
                Logout
            </Link>
        </>
    ) : (
        <>
            <Link href={'/login'} padding={2} color={'white'}>
                Login
            </Link>
            <Link href={'/register'} padding={2} color={'white'}>
                Register
            </Link>
        </>
    );
};
