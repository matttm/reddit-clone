import ReactDOM from "react-dom";
import React from "react";
import '../../pages/generic-modal/generic-modal.css';
import GenericModal from "../components/utilities/generic-modal/generic-modal";

const createModalServiceSingleton = () => {
    // container and modals are wrapped in the closure
    const container = document.getElementById('portal-container');
    let modalRef = null;
    const openModal = (childComponent : React.FC<any>) => {
        if (!container) {
            console.error('Error creating modal as container is null');
            return;
        }
        modalRef = ReactDOM.createPortal(
            <GenericModal></GenericModal>,
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

export const modalService = createModalServiceSingleton();
