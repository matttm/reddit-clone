import React, {useContext, useEffect, useState,} from "react";
import { GlobalContext } from "./GlobalContext";
import {Person, useIsAuthenticatedQuery} from "../generated/graphql";
import {useRouter} from "next/router";
import {createModalServiceSingleton, ModalService} from "../services/modal.service";
import {ModalContext} from "./ModalContext";

export const ModalContextProvider: React.FC<any> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalComponent, setModalComponent] = useState('none');
    const [modalProps, setModalProps] = useState(null);
    useEffect(() => {
    }, []);
    return (
        <ModalContext.Provider
            value={{
                isModalOpen,
                setIsModalOpen,
                modalComponent,
                setModalComponent,
                modalProps,
                setModalProps
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
