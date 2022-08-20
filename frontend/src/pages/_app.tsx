import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core';
import theme from '../theme';
import { Client, Provider } from 'urql';
import React from 'react';

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
    url: 'http://localhost:8080/query'
});
function MyApp({ Component, pageProps }: any) {
    return (
        <Provider value={client}>
            <ThemeProvider theme={theme}>
                <ColorModeProvider value="dark">
                    <CSSReset />
                    <Component {...pageProps} />
                </ColorModeProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;
