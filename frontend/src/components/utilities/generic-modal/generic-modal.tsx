/**
 * Page that handles User sign in and account creation
 */
import React, {useContext} from "react";
import {GlobalContext} from "../../../context/GlobalContext";

const GenericModal: React.FC<any> = ({ children }) => {
    console.log('children', children);
    const { modalService } = useContext(GlobalContext);
    return (
        <div className="modal" onClick={() => {
            if (modalService) modalService?.closeModal()
        }}>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
}

export default GenericModal;
