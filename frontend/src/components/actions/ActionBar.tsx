import { Flex } from '@chakra-ui/core';
import AuthAction from './AuthAction';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ActionBar = () => {
    return (
        <Flex direction={'row'}>
            <AuthAction>
                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
            </AuthAction>
            <AuthAction>
                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            </AuthAction>
        </Flex>
    );
};

export default ActionBar;
