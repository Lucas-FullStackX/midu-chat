import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChatContextProvider } from '../src/context/ChatContextProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChatContextProvider>
      <Component {...pageProps} />
    </ChatContextProvider>
  );
}

export default MyApp;
