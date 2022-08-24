import { Container } from '../components/Container';
import { Navbar } from '../components/Navbar';
import React from 'react';

const Index = () => (
    <>
        <Navbar />
        <Container height="100vh">
            <a href={'https://github.com/matttm'}>
                Matt Maloney : @github/matttm
            </a>
        </Container>
    </>
);

export default Index;
