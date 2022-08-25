import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/core';
import { AuthNav } from './AuthNav';
import { Container } from './Container';

export const Navbar: React.FC<any> = ({}) => {
    return (
        <Container w="15%">
            <Flex direction={'column'} color={'black'}>
                <AuthNav />
                <div className="nav-bar-link-container">
                    <Link href={'/createPost'} padding={2} color={'white'}>
                        Create Post
                    </Link>
                </div>
                <Link href={'/postList'} padding={2} color={'white'}>
                    Posts
                </Link>
            </Flex>
        </Container>
    );
};
