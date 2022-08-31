import { isAuthenticated } from '../../services/authentication.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { Flex } from '@chakra-ui/core';
import React from 'react';
import Action from './Action';

const AuthAction: React.FC<any> = ({ children }) => {
    const content = isAuthenticated() ? (
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
