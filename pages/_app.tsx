import React from 'react';
import { AppProps } from 'next/app';
import GlobalStyle from '../styles/base';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  );
}
