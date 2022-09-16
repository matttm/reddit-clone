import React, {useContext} from 'react';
import {
    destroyAuthInfo
} from '../../services/authentication.service';
import NavItem from './NavItem';
import {GlobalContext} from "../../context/GlobalContext";
import {Person} from "../../generated/graphql";

export const AuthNav: React.FC<any> = () => {
    const { person, isAuthenticated, setIsAuthenticated, setPerson } = useContext(GlobalContext);
    const logout = async () => {
        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        // destroyAuthInfo();
        setIsAuthenticated(false);
        setPerson({} as unknown as Person);
    };
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
