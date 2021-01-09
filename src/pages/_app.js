import {
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
  Switch,
} from "@chakra-ui/react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Head from "next/head";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  const { colorMode, toggleColorMode } = useColorMode("light");

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        alert(`GraphQL error: ${message}`);
      });
    }
  });
  const link = from([
    errorLink,
    new HttpLink({ uri: "https://pangaea-interviews.now.sh/api/graphql" }),
  ]);
  const client = new ApolloClient({ cache: new InMemoryCache(), link });
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
