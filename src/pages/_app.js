import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message }) => {
        alert(`GraphQL error: ${message}`); // Notify when any GraphQL error occurs
      });
    }
  });
  const link = from([
    errorLink,
    new HttpLink({ uri: "https://pangaea-interviews.now.sh/api/graphql" }), // GraphQL API url
  ]);
  const client = new ApolloClient({ cache: new InMemoryCache(), link }); // Configure Apollo client
  return (
    <>
      <Head>
        {/* Font CDN Imports */}
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
        {/* Wrap application with ApolloProvider */}
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
