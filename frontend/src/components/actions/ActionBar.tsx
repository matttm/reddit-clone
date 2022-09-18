import { Flex } from '@chakra-ui/core';
import AuthAction from './AuthAction';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ActionBar: React.FC<any> = ({ creatorId }) => {
    return (
        <Flex direction={'row'} justifyContent={'flex-end'}>
            <AuthAction creatorId={creatorId}>
                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
            </AuthAction>
            <AuthAction creatorId={creatorId}>
                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            </AuthAction>
        </Flex>
    );
};

export default ActionBar;
