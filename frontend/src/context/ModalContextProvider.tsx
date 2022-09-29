import React, {useEffect, useState,} from "react";
import {ModalContext} from "./ModalContext";
import {MODAL_COMPONENTS} from "../constants/model-components.constant";

export const ModalContextProvider: React.FC<any> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalComponent, setModalComponent] = useState('none');
    const [modalProps, setModalProps] = useState(null);
    const setModal = (isOpen: boolean, modalComponent: string = MODAL_COMPONENTS.None, modalProps: any = null) => {
        setIsModalOpen(isOpen);
        setModalComponent(modalComponent);
        setModalProps(modalProps);
    }
    useEffect(() => {
    }, []);
    return (
        <ModalContext.Provider
            value={{
                isModalOpen,
                modalComponent,
                modalProps,
                setModal
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
