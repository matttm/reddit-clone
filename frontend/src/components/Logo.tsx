import { Box, Text } from '@chakra-ui/core';
import React from 'react';

const Logo: React.FC<any> = props => {
    return (
        <Box padding={5} {...props}>
            <Text fontSize="lg" fontWeight="bold">
                The Clone
            </Text>
        </Box>
    );
};

export default Logo;
