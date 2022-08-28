import { Box, Text } from '@chakra-ui/core';
import React from 'react';
import Link from 'next/link';

const Logo: React.FC<any> = props => {
    return (
        <Box padding={5} cursor={'grab'} {...props}>
            <Link href={'/'}>
                <Text fontSize="lg" fontWeight="bold">
                    The Clone
                </Text>
            </Link>
        </Box>
    );
};

export default Logo;