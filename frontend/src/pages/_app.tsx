import {ColorModeProvider, CSSReset, Flex, ThemeProvider} from '@chakra-ui/core';
import theme from '../theme';
import {Client, Provider} from 'urql';
import React from 'react';
import {getToken} from '../services/authentication.service';
import '../styles/stylings.css';
import {Navbar} from '../components/navigation/Navbar';
import {Container} from '../components/utilities/Container';
import {GlobalContextProvide} from "../context/GlobalContextProvider";
import {IsAuthenticatedDocument} from "../generated/graphql";

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
                    <GlobalContextProvide auth={{ isAuthenticated, personInfo }}>
                        <Flex direction={'row'}>
                            <Navbar />
                            <Component {...pageProps} />
                        </Flex>
                        <Container height="100vh">
                            <a href={'https://github.com/matttm'}>
                                Matt Maloney : @github/matttm
                            </a>
                        </Container>
                    </GlobalContextProvide>
                </ColorModeProvider>
            </ThemeProvider>
        </Provider>
    );
}

MyApp.getInitialProps = async ({ ctx }: any) => {
    console.log('headers', ctx.req);
    console.log('get initial props is executing');
    const { data, error } = await client
        .query(IsAuthenticatedDocument)
        .toPromise();
    const _data = data?.isAuthenticated;
    const isAuthenticated = data?.validationErrors?.errors?.length === 0;
    const personInfo = data?.person;
    console.log('is auth finished');
    console.log(isAuthenticated, personInfo);
    return ({
        props: {
            isAuthenticated,
            personInfo
        }
    });
}

export default MyApp;
