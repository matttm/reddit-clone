import ReactDOM from "react-dom";
import React from "react";
import GenericModal from "../components/utilities/generic-modal/generic-modal";
import ReactDOMClient from "react-dom/client";

export interface ModalService {
    openModal: (c: React.ReactElement) => void;
    closeModal: () => void;
}

export const createModalServiceSingleton: () => Readonly<ModalService> = () => {
    // container and modals are wrapped in the closure
    const container = document.getElementById('portal-container');
    if (!container) {
        console.error('Error creating modal as container is null');
        return {} as Readonly<ModalService>;
    }
    const node = ReactDOMClient.createRoot(container);
    let modalRef = null;
    const openModal = (html: React.ReactElement) => {
        node.render(
            <GenericModal>
                {html}
            </GenericModal>
        );
    };
    const closeModal = () => {
        node.unmount();
        console.log('Unmounting component');

    };
    return Object.freeze({
        openModal,
        closeModal
    });
}
