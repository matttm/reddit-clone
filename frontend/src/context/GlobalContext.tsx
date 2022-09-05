import React from "react";
import {destroyAuthInfo, setAuthInfo} from "../services/authentication.service";
import {Person} from "../generated/graphql";

interface IGlobalContextProps {
    user: any;
    loading: boolean;
    setAuthInfo: (person: Person) => void;
    destroyAuthInfo: () => void;
    setLoading: (loading: boolean) => void;
    isAuthenticated: () => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
    user: {},
    loading: true,
    setAuthInfo: () => {},
    destroyAuthInfo: () => {},
    setLoading: () => {},
    isAuthenticated: () => true
});
