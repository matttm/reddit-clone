import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/core';

export const Navbar: React.FC<any> = ({}) => {
    return (
        <Box>
            <Flex direction={'column'} color={'black'}>
                <Link href={'/login'} padding={2} color={'white'}>
                    Login
                </Link>
                <Link href={'/register'} padding={2} color={'white'}>
                    Register
                </Link>
                <Link href={'/createPost'} padding={2} color={'white'}>
                    Create Post
                </Link>
                <Link href={'/postList'} padding={2} color={'white'}>
                    Posts
                </Link>
            </Flex>
        </Box>
    );
};
