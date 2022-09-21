/**
 * Page that handles User sign in and account creation
 */
import React, {useContext} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import {ThemeProvider} from "@chakra-ui/core";

const GenericModal: React.FC<any> = ({ children }) => {
    console.log('children', children);
    const { modalService } = useContext(GlobalContext);
    return (
        <ThemeProvider>
            <div className="modal" onClick={() => {
                if (modalService) modalService?.closeModal()
            }}>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </ThemeProvider>
    );
}

export default GenericModal;
