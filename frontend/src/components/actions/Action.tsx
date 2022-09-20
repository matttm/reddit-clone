import { Flex } from '@chakra-ui/core';
import React from 'react';

const Action: React.FC<any> = ({ action, children }) => {
    // console.log('action', action);
    return <Flex padding={'20px'} cursor={'grab'} onClick={action}>{children}</Flex>;
};
export default Action;
