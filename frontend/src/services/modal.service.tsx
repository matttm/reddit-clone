import ReactDOM from "react-dom";
import React from "react";
import GenericModal from "../components/utilities/generic-modal/generic-modal";
import ReactDOMClient from "react-dom/client";

export interface ModalService {
    openModal: (c: React.ReactElement) => void;
    closeModal: () => void;
}

export const createModalServiceSingleton: () => Readonly<ModalService> = () => {
    const openModal = _openModal;
    const closeModal = _closeModal;
    return Object.freeze({
        openModal,
        closeModal
    });
}


const _openModal = (html: React.ReactElement) => {
    const container = document.getElementById('portal-container');
    if (!container) {
        console.error('Error creating modal as container is null');
        return;
    }
    const node = ReactDOMClient.createRoot(container);
    let modalRef = null;
    node.render(
        <GenericModal>
            {html}
        </GenericModal>
    );
};

const _closeModal = () => {
    const container = document.getElementById('portal-container');
    if (!container) {
        console.error('Error creating modal as container is null');
        return;
    }
    ReactDOM.unmountComponentAtNode(container)
    console.log('Unmounting component');
};
