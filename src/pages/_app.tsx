import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Head from 'next/head'

import theme from '../theme'
import './index.css'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Space Watch</title>
        </Head>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
