import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/core';
import { AuthNav } from './AuthNav';

export const Navbar: React.FC<any> = ({}) => {
    return (
        <Box>
            <AuthNav />
            <Flex direction={'column'} color={'black'}>
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
