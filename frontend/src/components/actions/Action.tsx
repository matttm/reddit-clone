import { isAuthenticated } from '../../services/authentication.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { Flex } from '@chakra-ui/core';
import React from 'react';

const Action: React.FC<any> = ({ children }) => {
    return <Flex padding={'20px'}>{children}</Flex>;
};
export default Action;
