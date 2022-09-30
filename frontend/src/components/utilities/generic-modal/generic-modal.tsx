/**
 * Page that handles User sign in and account creation
 */
import React, {useContext} from "react";
import {ModalContext} from "../../../context/ModalContext";
import {getModalSelection} from "../../../services/modal.service";

const GenericModal: React.FC<any> = ({ children }) => {
    const { isModalOpen, setModal, modalComponent, modalProps } = useContext(ModalContext);
    const content = isModalOpen
        ? (
            <>
                <div className="modal" onClick={() => {
                    setModal(false);
                }}>
                    <div className="modal-content">
                        {getModalSelection(modalComponent, modalProps)}
                    </div>
                </div>
            </>
        )
        : null;
    return (
        <>
            {content}
        </>
    );
}

export default GenericModal;
