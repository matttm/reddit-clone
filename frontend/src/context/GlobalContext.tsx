import React from "react";
import {Person} from "../generated/graphql";

interface IGlobalContextProps {
    person: Person | null,
    isAuthenticated: boolean,
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setIsAuthenticated: (isAuth: boolean) => void;
    setPerson: (p: Person) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
    person: null,
    isAuthenticated: false,
    loading: true,
    setLoading: () => {},
    setIsAuthenticated: () => {},
    setPerson: () => {}
});
