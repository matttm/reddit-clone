import React, {useContext, useEffect, useState,} from "react";
import { GlobalContext } from "./GlobalContext";
import {Person, useIsAuthenticatedQuery} from "../generated/graphql";

export const GlobalContextProvider: React.FC<any> = ({
                                                        auth: {
                                                            isAuthenticated,
                                                            personInfo
                                                        },
                                                        children
                                                    }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [_isAuthenticated, setIsAuthenticated] = useState(false);
    const [person, setPerson] = useState(null as unknown as Person);
    useEffect(() => {
        setIsLoading(true);
        setIsAuthenticated(isAuthenticated);
        setPerson(person);
        setIsLoading(false);
    }, []);
    // const person = {}
    return (
        <GlobalContext.Provider
            value={{
                person: person as Person,
                isAuthenticated: _isAuthenticated,
                loading: isLoading,
                setLoading: setIsLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

// export async function getIsAuthenticated() {
//     const [result, reexecuteQuery] = useIsAuthenticatedQuery();
//     const data = result.data?.isAuthenticated;
//     const isAuthenticated = data?.validationErrors?.errors?.length === 0;
//     const personInfo = data?.person;
//     console.log(`User is ${isAuthenticated ? '' : 'not '}authenticated`);
//     return {
//         isAuthenticated,
//         personInfo
//     };
// }
