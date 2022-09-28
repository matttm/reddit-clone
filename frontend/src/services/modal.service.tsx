import ReactDOM from "react-dom";
import React from "react";
import GenericModal from "../components/utilities/generic-modal/generic-modal";
import ReactDOMClient from "react-dom/client";

export interface ModalService {
    openModal: (c: React.ReactElement) => void;
    closeModal: () => void;
}

export const createModalServiceSingleton: () => Readonly<ModalService> = () => {
    const container = document.getElementById('portal-container');
    if (!container) {
        console.error('Error creating modal as container is null');
        return {} as Readonly<ModalService>;
    }
    const node = ReactDOMClient.createRoot(container);
    const _openModal = (html: React.ReactElement) => {
        node.render(
            <GenericModal>
                {html}
            </GenericModal>
        );
    };
    const _closeModal = () => {
        if (!node) {
            console.error('Error creating modal as container is null');
            return;
        }
        node.unmount();
        console.log('Unmounting component');
    };
    return Object.freeze({
        openModal: _openModal,
        closeModal: _closeModal
    });
}
