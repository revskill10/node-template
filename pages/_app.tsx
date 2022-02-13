import 'reflect-metadata';
import * as React from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';
import {
  Hydrate,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { NextRouter } from 'next/router';
import { NextQueryParamProvider } from 'next-query-params';

type AppProps<
  R extends NextRouter = NextRouter,
  P = unknown
> = AppInitialProps & {
  Component: NextComponentType<NextPageContext, any, P>;
  router: R;
  err?: Error; // Only defined if there was an error
  __N_SSG?: boolean;
  __N_SSP?: boolean;
};
function MyApp({ Component, pageProps, err }: AppProps): JSX.Element {

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error: Error, query) => {
            console.log(error);
          },
        }),
      })
  );

  return (
    <NextQueryParamProvider>
    <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} err={err} />
        </Hydrate>
    </QueryClientProvider>
    </NextQueryParamProvider>
  );
}

export default MyApp;
