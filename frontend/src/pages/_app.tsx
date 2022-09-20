import {ColorModeProvider, CSSReset, Flex, ThemeProvider} from '@chakra-ui/core';
import theme from '../theme';
import {Client, Provider} from 'urql';
import React from 'react';
import {getToken} from '../services/authentication.service';
import {Navbar} from '../components/navigation/Navbar';
import {Container} from '../components/utilities/Container';
import {GlobalContextProvider} from "../context/GlobalContextProvider";
import {IsAuthenticatedDocument} from "../generated/graphql";

import '../styles/stylings.css';
import '../components/utilities/generic-modal/generic-modal.css';

const client = new Client({
    url: 'http://localhost:8080/query',
    fetchOptions: () => {
        const token = getToken();
        return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    }
});
function MyApp({
                   Component,
                   pageProps,
    auth
}: any) {
    return (
        <>
        <div id={'portal-container'}></div>
            <Provider value={client}>
                <ThemeProvider theme={theme}>
                    <ColorModeProvider value="dark">
                        <CSSReset />
                        <GlobalContextProvider auth={{...auth}}>
                            <Flex direction={'row'}>
                                <Navbar />
                                <Component {...pageProps} />
                            </Flex>
                            <Container height="100vh">
                                <a href={'https://github.com/matttm'}>
                                    Matt Maloney : @github/matttm
                                </a>
                            </Container>
                        </GlobalContextProvider>
                    </ColorModeProvider>
                </ThemeProvider>
            </Provider>
        </>
    );
}

MyApp.getInitialProps = async (req: any) => {
    // console.log('headers', ctx.req);
    // console.log('get initial props is executing');
    const cookies = req?.ctx?.req?.cookies;
    if (cookies === undefined) {
        return {};
    }
    const token = cookies['TOKEN_KEY'];

    // console.log('in init props', token);
    // console.log('token', req?.ctx?.req?.headers)
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
    // console.log('is auth finished');
    // console.log(_data);
    // console.log(isAuthenticated, personInfo);
    return ({
        auth: {
            isAuthenticated,
            personInfo
        }
    });
    // return {};
}

export default MyApp;
