import React from "react";

interface IModalContextProps {
    isModalOpen: boolean;
    setIsModalOpen: (v: boolean) => void;
    modalComponent: string;
    setModalComponent: (v: string) => void;
    modalProps: any;
    setModalProps: (v: any) => void;
}

export const ModalContext = React.createContext<IModalContextProps>({
    isModalOpen: false,
    setIsModalOpen: () => null,
    modalComponent: 'none',
    setModalComponent: () => null,
    modalProps: {},
    setModalProps: () => null
});
