import {ColorModeProvider, CSSReset, Flex, ThemeProvider} from '@chakra-ui/core';
import theme from '../theme';
import {Provider} from 'urql';
import React from 'react';
import {Navbar} from '../components/navigation/Navbar';
import {Container} from '../components/utilities/Container';
import {GlobalContextProvider} from "../context/GlobalContextProvider";
import {IsAuthenticatedDocument} from "../generated/graphql";

import '../styles/stylings.css';
import '../components/utilities/generic-modal/generic-modal.css';
import {client} from "../client/client";
import GenericModal from "../components/utilities/generic-modal/generic-modal";
import {ModalContext} from "../context/ModalContext";
import {ModalContextProvider} from "../context/ModalContextProvider";

function MyApp({
                   Component,
                   pageProps,
    auth
}: any) {
    return (
        <>
            <Provider value={client}>
                <ThemeProvider theme={theme}>
                    <ColorModeProvider value="dark">
                        <CSSReset />
                        <GlobalContextProvider auth={{...auth}}>
                            <ModalContextProvider>
                                <GenericModal />
                                <Flex direction={'row'}>
                                    <Navbar />
                                    <Component {...pageProps} />
                                </Flex>
                                <Container height="100vh">
                                    <a href={'https://github.com/matttm'}>
                                        Matt Maloney : @github/matttm
                                    </a>
                                </Container>
                            </ModalContextProvider>
                        </GlobalContextProvider>
                    </ColorModeProvider>
                </ThemeProvider>
            </Provider>
        </>
    );
}

MyApp.getInitialProps = async (req: any) => {
    const cookies = req?.ctx?.req?.cookies;
    if (cookies === undefined) {
        return {};
    }
    const token = cookies['TOKEN_KEY'];
    const { data, error } = await client
        .query(IsAuthenticatedDocument, {}, {
            fetchOptions: {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            }
        })
        .toPromise();
    const _data = data?.isAuthenticated;
    const personInfo = _data?.person;
    const isAuthenticated = personInfo !== undefined && personInfo !== null;
    return ({
        auth: {
            isAuthenticated,
            personInfo
        }
    });
    // return {};
}

export default MyApp;
