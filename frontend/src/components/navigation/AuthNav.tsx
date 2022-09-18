import React, {useContext} from 'react';
import NavItem from './NavItem';
import {GlobalContext} from "../../context/GlobalContext";
import {Person} from "../../generated/graphql";
import {useRouter} from "next/router";
import {destroyAuthInfo} from "../../services/authentication.service";

const AuthNav: React.FC<any> = () => {
    const router = useRouter();
    const { person, isAuthenticated, setIsAuthenticated, setPerson } = useContext(GlobalContext);
    const logout = async () => {
        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).catch(console.log);
        setIsAuthenticated(false);
        setPerson(null as unknown as Person);
        destroyAuthInfo();
        console.log('Logging out', isAuthenticated, person);
        router.push('/');
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

export default AuthNav;
