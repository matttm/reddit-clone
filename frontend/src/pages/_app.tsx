import {
    ColorModeProvider,
    CSSReset,
    Flex,
    ThemeProvider
} from '@chakra-ui/core';
import theme from '../theme';
import {
    cacheExchange,
    Client,
    dedupExchange,
    fetchExchange,
    makeOperation,
    Provider,
    Exchange
} from 'urql';
import React from 'react';
import { getToken } from '../services/authentication.service';
import { authExchange } from '@urql/exchange-auth';
import '../styles/stylings.css';
import { Navbar } from '../components/navigation/Navbar';
import { Container } from '../components/utilities/Container';
import {getIsAuthenticated, GlobalContextProvide} from "../context/GlobalContextProvider";

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors) {
//         console.log('graphQLErrors', graphQLErrors);
//     }
//     if (networkError) {
//         console.log('networkError', networkError);
//     }
// });
//
// const httpLink = new HttpLink({
//     uri: 'http://localhost:3001/graphql'
// });
//
// const link = ApolloLink.from([errorLink, httpLink]);
//
// const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: link
// });

const client = new Client({
    url: 'http://localhost:8080/query',
    // exchanges: [
    //     dedupExchange,
    //     cacheExchange,
    //     authExchange({
    //         addAuthToOperation: ({
    //                                  authState,
    //                                  operation,
    //                              }) => {
    //             // the token isn't in the auth state, return the operation without changes
    //             if (!authState || !authState.token) {
    //                 return operation;
    //             }
    //
    //             // fetchOptions can be a function (See Client API) but you can simplify this based on usage
    //             const fetchOptions =
    //                 typeof operation.context.fetchOptions === 'function'
    //                     ? operation.context.fetchOptions()
    //                     : operation.context.fetchOptions || {};
    //
    //             return makeOperation(
    //                 operation.kind,
    //                 operation,
    //                 {
    //                     ...operation.context,
    //                     fetchOptions: {
    //                         ...fetchOptions,
    //                         headers: {
    //                             ...fetchOptions.headers,
    //                             "Authorization": authState.token,
    //                         },
    //                     },
    //                 },
    //             );
    //         },
    //         willAuthError: ({ authState }) => {
    //             if (!authState) return true;
    //             // e.g. check for expiration, existence of auth etc
    //             return false;
    //         },
    //         didAuthError: ({ error }) => {
    //             // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
    //             return error.graphQLErrors.some(
    //                 e => e.extensions?.code === 'FORBIDDEN',
    //             );
    //         },
    //         getAuth: async ({ authState, mutate }) => {
    //             // for initial launch, fetch the auth state from storage (local storage, async storage etc)
    //             if (!authState) {
    //                 const token = localStorage.getItem('token');
    //                 const refreshToken = localStorage.getItem('refreshToken');
    //                 if (token && refreshToken) {
    //                     return { token, refreshToken };
    //                 }
    //                 return null;
    //             }
    //
    //             /**
    //              * the following code gets executed when an auth error has occurred
    //              * we should refresh the token if possible and return a new auth state
    //              * If refresh fails, we should log out
    //              **/
    //
    //                 // if your refresh logic is in graphQL, you must use this mutate function to call it
    //                 // if your refresh logic is a separate RESTful endpoint, use fetch or similar
    //             const result = await mutate(refreshMutation, {
    //                     token: authState?.refreshToken,
    //                 });
    //
    //             if (result.data?.refreshLogin) {
    //                 // save the new tokens in storage for next restart
    //                 localStorage.setItem('token', result.data.refreshLogin.token);
    //                 localStorage.setItem('refreshToken', result.data.refreshLogin.refreshToken);
    //
    //                 // return the new tokens
    //                 return {
    //                     token: result.data.refreshLogin.token,
    //                     refreshToken: result.data.refreshLogin.refreshToken,
    //                 };
    //             }
    //
    //             // otherwise, if refresh fails, log clear storage and log out
    //             localStorage.clear();
    //
    //             // your app logout logic should trigger here
    //             // logout();
    //
    //             return null;
    //         },
    //     }) as unknown as Exchange,
    //     fetchExchange
    // ]
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

export async function getInitialProps(ctx: any) {
    console.log('ctx', ctx);
    console.log('get initial props is executing');
    const {isAuthenticated, personInfo} = ctx;//await getIsAuthenticated();
    return ({
        props: {
            isAuthenticated,
            personInfo
        }
    });
}

export default MyApp;
