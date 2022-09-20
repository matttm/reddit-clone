import React, {useContext, useEffect, useState,} from "react";
import { GlobalContext } from "./GlobalContext";
import {Person, useIsAuthenticatedQuery} from "../generated/graphql";
import {useRouter} from "next/router";
import {createModalServiceSingleton, ModalService} from "../services/modal.service";

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
    const [person, setPerson] = useState(null as unknown as Person);
    const [_modalService, setModalService] = useState(null as unknown as ModalService);
    useEffect(() => {
        setIsLoading(true);
        setModalService(createModalServiceSingleton());
        setIsAuthenticated(!!isAuthenticated);
        setPerson(personInfo);
        setIsLoading(false);
    }, []);
    return (
        <GlobalContext.Provider
            value={{
                person: person as Person,
                isAuthenticated: _isAuthenticated,
                loading: isLoading,
                setLoading: setIsLoading,
                setIsAuthenticated: setIsAuthenticated,
                setPerson: setPerson,
                modalService: _modalService
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
