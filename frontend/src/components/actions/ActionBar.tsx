import { Flex } from '@chakra-ui/core';
import AuthAction from './AuthAction';
import React from 'react';

const ActionBar = () => {
    return (
        <Flex direction={'row'}>
            <AuthAction></AuthAction>
        </Flex>
    );
};

export default ActionBar;
