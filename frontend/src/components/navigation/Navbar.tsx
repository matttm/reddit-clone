import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/core';
import AuthNav from './AuthNav';
import { Container } from '../utilities/Container';
import NavItem from './NavItem';
import Logo from './Logo';

export const Navbar: React.FC<any> = props => {
    return (
        <Container w="15%">
            <Logo />
            <Flex direction={'column'} color={'black'}>
                <AuthNav />
                <NavItem navTo={'/createPost'}>Create Post</NavItem>
                <NavItem navTo={'/posts'}>Posts</NavItem>
            </Flex>
        </Container>
    );
};
