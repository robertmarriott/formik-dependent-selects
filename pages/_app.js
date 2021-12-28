import { CssBaseline, ThemeProvider } from '@mui/material';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import { CacheProvider } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import createEmotionCache from '../lib/createEmotionCache';
import theme from '../styles/theme';

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Next Demo</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              <Layout>
                <CssBaseline />
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
              </Layout>
            </ThemeProvider>
          </CacheProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
