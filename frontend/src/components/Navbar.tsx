import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/core';
import { AuthNav } from './AuthNav';
import { Container } from './Container';

export const Navbar: React.FC<any> = ({}) => {
    return (
        <Container w="15%">
            <Flex direction={'column'} color={'black'}>
                <AuthNav />
                <Box border={'1px'} borderBottomColor={'white'}>
                    <Link href={'/createPost'} padding={2} color={'white'}>
                        Create Post
                    </Link>
                </Box>
                <Link href={'/postList'} padding={2} color={'white'}>
                    Posts
                </Link>
            </Flex>
        </Container>
    );
};
