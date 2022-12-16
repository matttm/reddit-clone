import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';

/**
 * Simple logo
 *
 * @param props
 * @constructor
 */
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
