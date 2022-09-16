import React, {useContext} from 'react';
import {
    destroyAuthInfo
} from '../../services/authentication.service';
import NavItem from './NavItem';
import {GlobalContext} from "../../context/GlobalContext";

export const AuthNav: React.FC<any> = () => {
    const { person, isAuthenticated } = useContext(GlobalContext);
    const logout = async () => {
        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        destroyAuthInfo();
    };
    console.log('from nav', isAuthenticated)
    return isAuthenticated ? (
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
