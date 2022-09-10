import React, {useState,} from "react";
import { GlobalContext } from "./GlobalContext";
import {useIsAuthenticatedQuery} from "../generated/graphql";

export const GlobalContextProvide: React.FC<any> = ({ isAuthenticated, personinfo, children }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <GlobalContext.Provider
            value={{
                person: personinfo,
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
