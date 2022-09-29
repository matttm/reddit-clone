import React from "react";

interface IModalContextProps {
    isModalOpen: boolean;
    modalComponent: string;
    modalProps: any;
    setModal: (v: boolean, s?: string, p?: any) => void;
}

export const ModalContext = React.createContext<IModalContextProps>({
    isModalOpen: false,
    modalComponent: 'none',
    modalProps: {},
    setModal: () => null
});
