/**
 * Page that handles User sign in and account creation
 */
import React from "react";
import {modalService} from "../../../services/modal.service";

const GenericModal: React.FC<any> = (props) => {

    return (
        <div className="modal" onClick={() => modalService.closeModal()}>
            <div className="modal-content">
                {props.children}
            </div>
        </div>
    );
}

export default GenericModal;
