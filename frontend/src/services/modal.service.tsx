import ReactDOM from "react-dom";
import React from "react";
import GenericModal from "../components/utilities/generic-modal/generic-modal";

export interface ModalService {
    openModal: (c: React.ReactElement) => void;
    closeModal: () => void;
}

export const createModalServiceSingleton: () => Readonly<ModalService> = () => {
    // container and modals are wrapped in the closure
    const container = document.getElementById('portal-container');
    let modalRef = null;
    const openModal = (html: React.ReactElement) => {
        if (!container) {
            console.error('Error creating modal as container is null');
            return;
        }
        modalRef = ReactDOM.render(
            <GenericModal>
                {html}
            </GenericModal>,
            container
        )
    };
    const closeModal = () => {
        modalRef = null;
        // only try to unmount if container exisrs
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
        }
    };
    return Object.freeze({
        openModal,
        closeModal
    });
}
