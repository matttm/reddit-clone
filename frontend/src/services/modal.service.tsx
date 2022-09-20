import ReactDOM from "react-dom";
import React from "react";
import GenericModal from "../components/utilities/generic-modal/generic-modal";

export interface ModalService {
    openModal: (c: React.FC<any>) => void;
    closeModal: () => void;
}

export const createModalServiceSingleton: () => Readonly<ModalService> = () => {
    // if (typeof window === 'undefined') {
    //     console.error('Error: document is undefined');
    //     return;
    //     // return { openModal: false, closeModal: true }
    // }
    // container and modals are wrapped in the closure
    const container = document.getElementById('portal-container');
    let modalRef = null;
    const openModal = (ChildComponent : React.FC<any>) => {
        console.log('container', container);
        if (!container) {
            console.error('Error creating modal as container is null');
            return;
        }
        modalRef = ReactDOM.render(
            <GenericModal>
                <ChildComponent></ChildComponent>
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

// export const modalService: Readonly<ModalService> = createModalServiceSingleton();
