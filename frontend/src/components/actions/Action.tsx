import { Flex } from '@chakra-ui/core';
import React from 'react';

const Action: React.FC<any> = ({ action, children }) => {
    return <Flex padding={'20px'} onClick={action}>{children}</Flex>;
};
export default Action;
