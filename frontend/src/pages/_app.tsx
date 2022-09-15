import {ColorModeProvider, CSSReset, Flex, ThemeProvider} from '@chakra-ui/core';
import theme from '../theme';
import {Client, Provider} from 'urql';
import React from 'react';
import {getToken} from '../services/authentication.service';
import '../styles/stylings.css';
import {Navbar} from '../components/navigation/Navbar';
import {Container} from '../components/utilities/Container';
import {GlobalContextProvider} from "../context/GlobalContextProvider";
import {IsAuthenticatedDocument} from "../generated/graphql";
import cookie from "js-cookie";
import {NextRequest} from "next/server";

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
                   isAuthenticated,
                   personInfo
}: any) {
    return (
        <Provider value={client}>
            <ThemeProvider theme={theme}>
                <ColorModeProvider value="dark">
                    <CSSReset />
                    <GlobalContextProvider auth={{ isAuthenticated, personInfo }}>
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
    );
}

MyApp.getInitialProps = async (req: any) => {
    // console.log('headers', ctx.req);
    // console.log('get initial props is executing');
    const cookies = req?.ctx?.req?.cookies;
    console.log('in init props', cookies);
    // console.log('token', req?.ctx?.req?.headers)
    const { data, error } = await client
        .query(IsAuthenticatedDocument, {}, {
            fetchOptions: {
                headers: {
                    Authorization: cookies['TOKEN_KEY']
                }
            }
        })
        .toPromise();
    const _data = data?.isAuthenticated;
    const isAuthenticated = _data?.validationErrors?.errors?.length === 0;
    const personInfo = _data?.person;
    // console.log('is auth finished');
    console.log(isAuthenticated, personInfo);
    return ({
        props: {
            isAuthenticated,
            personInfo
        }
    });
}

export default MyApp;
