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
    const node = ReactDOMClient.createRoot(container);
    let modalRef = null;
    const openModal = (html: React.ReactElement) => {
        if (!container) {
            console.error('Error creating modal as container is null');
            return;
        }
        node.render(
            <GenericModal>
                {html}
            </GenericModal>
        );
    };
    const closeModal = () => {
        modalRef = null;
        console.log('container', container)
        // only try to unmount if container exisrs
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            console.log('Unmounting component');
        }

    };
    return Object.freeze({
        openModal,
        closeModal
    });
}
