/**
 * Page that handles User sign in and account creation
 */
import React, {useContext} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import {ThemeProvider} from "@chakra-ui/core";
import {Provider, useClient} from "urql";
import {createModalServiceSingleton} from "../../../services/modal.service";

const GenericModal: React.FC<any> = ({ children }) => {
    const modalService = createModalServiceSingleton();
    const client = useClient();
    return (
        <Provider value={client}>
            <ThemeProvider>
                <div className="modal" onClick={() => {
                    if (modalService) modalService?.closeModal()
                }}>
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default GenericModal;
