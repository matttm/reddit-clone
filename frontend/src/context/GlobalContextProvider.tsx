import React, {useContext, useEffect, useState,} from "react";
import { GlobalContext } from "./GlobalContext";
import {Person, useIsAuthenticatedQuery} from "../generated/graphql";
import {useRouter} from "next/router";

export const GlobalContextProvider: React.FC<any> = ({
                                                        auth: {
                                                            isAuthenticated,
                                                            personInfo
                                                        },
                                                        children
                                                    }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [_isAuthenticated, setIsAuthenticated] = useState(false);
    const [person, setPerson] = useState({});
    useEffect(() => {
        setIsLoading(true);
        setIsAuthenticated(!!isAuthenticated);
        setPerson({...personInfo});
        setIsLoading(false);
    }, []);
    // whenever there is a login or logout, go home
    useEffect(() => {
        router.push('/');
    }, [_isAuthenticated, personInfo]);
    // const person = {}
    return (
        <GlobalContext.Provider
            value={{
                person: person as Person,
                isAuthenticated: _isAuthenticated,
                loading: isLoading,
                setLoading: setIsLoading,
                setIsAuthenticated: setIsAuthenticated,
                setPerson: setPerson
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
