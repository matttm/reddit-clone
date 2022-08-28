import React from 'react';
import {
    destroyAuthInfo,
    isAuthenticated
} from '../../services/authentication.service';
import NavItem from './NavItem';

export const AuthNav: React.FC<any> = () => {
    const logout = () => {
        destroyAuthInfo();
    };
    return isAuthenticated() ? (
        <>
            <NavItem navTo={'/'} onClick={() => logout()}>
                Logout
            </NavItem>
        </>
    ) : (
        <>
            <NavItem navTo={'/login'}>Login</NavItem>
            <NavItem navTo={'/register'}>Register</NavItem>
        </>
    );
};
