import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }: AppProps) {
  const client = useApollo(pageProps);
  return (
      <Provider store={store}>
        <ApolloProvider client={client}>
        <AnimatePresence exitBeforeEnter>
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
        </ApolloProvider>
      </Provider>
  );
}
export default MyApp;
