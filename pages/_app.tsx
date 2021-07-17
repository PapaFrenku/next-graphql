import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps, {
    uri: process.env.HOST,
    credentials: 'same-origin'
  })

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
export default MyApp
