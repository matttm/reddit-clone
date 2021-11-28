import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core';
import theme from '../theme';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createClient } from 'urql';

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache()
});
function MyApp({ Component, pageProps }: any) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <ColorModeProvider value="dark">
                    <CSSReset />
                    <Component {...pageProps} />
                </ColorModeProvider>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default MyApp;
