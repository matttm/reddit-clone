import { Flex } from '@chakra-ui/core';
import React from 'react';

const Action: React.FC<any> = ({ children }) => {
    return <Flex padding={'20px'}>{children}</Flex>;
};
export default Action;
