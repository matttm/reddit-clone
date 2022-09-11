import React, {useContext, useEffect, useState,} from "react";
import { GlobalContext } from "./GlobalContext";
import {Person, useIsAuthenticatedQuery} from "../generated/graphql";

export const GlobalContextProvide: React.FC<any> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [person, setPerson] = useState(null as unknown as Person);
    const [isAuthenticated, setAuthenticated] = useState(true);

    const getAuthentication = () => {
        const [result, reexecuteQuery] = useIsAuthenticatedQuery();
        const data = result.data?.isAuthenticated;
        const isAuthenticated = data?.validationErrors?.errors?.length === 0;
        const personInfo = data?.person;
        return ({
            isAuthenticated,
            personInfo
        })
    };
    useEffect(() => {
        setIsLoading(true);
        const payload = getAuthentication();
        setPerson(payload.personInfo as Person);
        setAuthenticated(payload.isAuthenticated);
        setIsLoading(false);
    }, []);
    return (
        <GlobalContext.Provider
            value={{
                person,
                isAuthenticated: isAuthenticated,
                loading: isLoading,
                setLoading: setIsLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export async function getServerSideProps() {
    const [result, reexecuteQuery] = useIsAuthenticatedQuery();
    const data = result.data?.isAuthenticated;
    const isAuthenticated = data?.validationErrors?.errors?.length === 0;
    const personInfo = data?.person;
    console.log(`User is ${isAuthenticated ? '' : 'not '}authenticated`);
    return {
        props: {
            isAuthenticated,
            personInfo
        }
    };
}
