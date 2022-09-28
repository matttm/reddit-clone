/**
 * Page that handles User sign in and account creation
 */
import React, {useContext} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import {ThemeProvider} from "@chakra-ui/core";
import {Provider, useClient} from "urql";
import {ModalContext} from "../../../context/ModalContext";
import {getModalSelection} from "../../../services/modal.service";

const GenericModal: React.FC<any> = ({ children }) => {
    const { isModalOpen, setIsModalOpen, modalComponent, setModalComponent, modalProps, setModalProps } = useContext(ModalContext);
    const content = isModalOpen
        ? (
            <>
                <div className="modal" onClick={() => {
                    setIsModalOpen(false);
                    setModalComponent('none');
                    setModalProps(null);
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
