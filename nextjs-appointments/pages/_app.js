import { ChakraProvider } from '@chakra-ui/react';
import { overrides  } from '../themes/themeIndex';
import Layout from '../components/layout';
import "@fontsource/actor"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={overrides}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
