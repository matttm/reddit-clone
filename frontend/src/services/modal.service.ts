import ReactDOM from "react-dom";
import React from "react";
import '../../pages/GenericModal/generic-modal.css';
import GenericModal from "../pages/GenericModal/generic-modal";

const createModalServiceSingleton = () => {
    // container and modals are wrapped in the closure
    const container = document.getElementById('portal-container');
    let modalRef = null;
    const openModal = (html : React.FC<any) => {
        modalRef = ReactDOM.render(
            <GenericModal>
                {html}
            </GenericModal>,
        container
    );
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
