import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import React, {useContext} from 'react';
import Action from './Action';
import {GlobalContext} from "../../context/GlobalContext";

const AuthAction: React.FC<any> = ({ children }) => {
    const { isAuthenticated } = useContext(GlobalContext);
    const content = !isAuthenticated ? (
        <>
            <FontAwesomeIcon icon={faLock} />
        </>
    ) : (
        <>{children}</>
    );
    return (
        <>
            <Action>{content}</Action>
        </>
    );
};
export default AuthAction;
