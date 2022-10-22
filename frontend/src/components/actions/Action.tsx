import { Flex } from '@chakra-ui/core';
import React from 'react';

/**
 * Associating a click handler with some ui element to be in an action bar
 *
 * @param action a function to be executed on click
 * @param children the ui element
 * @constructor
 */
const Action: React.FC<any> = ({ action, children }) => {
    return <Flex padding={'20px'} cursor={'grab'} onClick={action}>{children}</Flex>;
};
export default Action;
