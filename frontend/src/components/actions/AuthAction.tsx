import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import React, {useContext} from 'react';
import Action from './Action';
import {GlobalContext} from "../../context/GlobalContext";

const AuthAction: React.FC<any> = ({ creatorId, children }) => {
    const {isAuthenticated, person} = useContext(GlobalContext);
    const content = isAuthenticated && person?.id === creatorId ? (
        <>
            {children}
        </>
    ) : (
        <>
            <FontAwesomeIcon icon={faLock}/>
        </>
    );
    return (
        <>
            <Action>{content}</Action>
        </>
    );
};
export default AuthAction;
