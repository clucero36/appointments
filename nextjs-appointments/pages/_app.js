import { ChakraProvider } from '@chakra-ui/react';
import { overrides  } from '../themes/themeIndex';
import "@fontsource/actor";
import Layout from '../components/Layout';

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
