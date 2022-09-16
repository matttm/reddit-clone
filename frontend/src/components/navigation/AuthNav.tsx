import React, {useContext, useEffect} from 'react';
import {
    destroyAuthInfo
} from '../../services/authentication.service';
import NavItem from './NavItem';
import {GlobalContext} from "../../context/GlobalContext";
import {Person} from "../../generated/graphql";
import {useRouter} from "next/router";

export const AuthNav: React.FC<any> = () => {
    const router = useRouter();
    const { person, isAuthenticated, setIsAuthenticated, setPerson } = useContext(GlobalContext);
    // useEffect(() => {}, [isAuthenticated, person]);
    const logout = async () => {
        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).catch(console.log);
        // destroyAuthInfo();
        setIsAuthenticated(false);
        setPerson(null as unknown as Person);
        console.log('Logging out', isAuthenticated, person);
    };
    return isAuthenticated ? (
        <>
            <NavItem onClick={() => logout()}>
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
