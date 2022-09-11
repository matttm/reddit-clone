import React, {useContext, useEffect, useState,} from "react";
import { GlobalContext } from "./GlobalContext";
import {Person, useIsAuthenticatedQuery} from "../generated/graphql";

export const GlobalContextProvide: React.FC<any> = ({
                                                        auth: {
                                                            isAuthenticated,
                                                            personInfo
                                                        },
                                                        children
                                                    }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [person, setPerson] = useState(null as unknown as Person);
    // useEffect(() => {
    //     console.log('Loading...');
    //     setIsLoading(true);
    //     const [result, reexecuteQuery] = useIsAuthenticatedQuery();
    //     const data = result.data?.isAuthenticated;
    //     const isAuthenticated = data?.validationErrors?.errors?.length === 0;
    //     const personInfo = data?.person;
    //     // const payload = getAuthentication();
    //     setPerson(personInfo as Person);
    //     setAuthenticated(isAuthenticated);
    //     // setPerson(payload.personInfo as Person);
    //     // setAuthenticated(payload.isAuthenticated);
    //     setIsLoading(false);
    //     console.log('Loading done');
    // }, []);
    return (
        <GlobalContext.Provider
            value={{
                person: person as Person,
                isAuthenticated: isAuthenticated,
                loading: isLoading,
                setLoading: setIsLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export async function getIsAuthenticated() {
    const [result, reexecuteQuery] = useIsAuthenticatedQuery();
    const data = result.data?.isAuthenticated;
    const isAuthenticated = data?.validationErrors?.errors?.length === 0;
    const personInfo = data?.person;
    console.log(`User is ${isAuthenticated ? '' : 'not '}authenticated`);
    return {
        isAuthenticated,
        personInfo
    };
}
