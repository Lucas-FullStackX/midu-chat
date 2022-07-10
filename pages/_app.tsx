import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChatContextProvider } from '../src/context/ChatContextProvider';
import { UserProvider } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChatContextProvider>
      <UserProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
      </UserProvider>
    </ChatContextProvider>
  );
}

export default MyApp;
