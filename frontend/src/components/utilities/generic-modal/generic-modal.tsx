/**
 * Page that handles User sign in and account creation
 */
import React, {useContext} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import {ThemeProvider} from "@chakra-ui/core";
import {Provider, useClient} from "urql";
import {client} from "../../../client/client";

const GenericModal: React.FC<any> = ({ children }) => {
    console.log('children', children);
    const { modalService } = useContext(GlobalContext);
    // const client = useClient();
    console.log(client)
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
