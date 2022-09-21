import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import React, {useContext} from 'react';
import Action from './Action';
import {GlobalContext} from "../../context/GlobalContext";
import {act} from "react-dom/test-utils";

const AuthAction: React.FC<any> = ({ creatorId, action, children }) => {
    const {isAuthenticated, person} = useContext(GlobalContext);
    console.log('id', person?.id, creatorId)
    const content = isAuthenticated && person?.id === creatorId ? (
        <>
            <Action action={action}>{children}</Action>
        </>
    ) : (
        <>
            <Action>
                <FontAwesomeIcon icon={faLock}/>
            </Action>
        </>
    );
    return (
        <>
            {content}
        </>
    );
};
export default AuthAction;
