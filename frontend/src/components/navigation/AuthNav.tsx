import React, {useContext} from 'react';
import NavItem from './NavItem';
import {GlobalContext} from "../../context/GlobalContext";
import {Person} from "../../generated/graphql";
import {useRouter} from "next/router";
import {destroyAuthInfo} from "../../services/authentication.service";

/**
 * A section of the navbar that displays a Login link when
 * not logged in, and a Logout link otherwise
 *
 * @constructor
 */
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
        router.push('/');
    };
    return isAuthenticated ? (
        <>
            <NavItem id={'logout-nav-item'} onClick={() => logout()}>
                Logout
            </NavItem>
        </>
    ) : (
        <>
            <NavItem id={'login-nav-item'} navTo={'/login'}>Login</NavItem>
            <NavItem id={'register-nav-item'} navTo={'/register'}>Register</NavItem>
        </>
    );
};

export default AuthNav;
