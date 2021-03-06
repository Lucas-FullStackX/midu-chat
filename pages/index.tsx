import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { LoginForm } from '../src/components/LoginForm';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push('/chat');
    }
  }, [user]);
  return (
    <div className="container flex h-full min-h-screen content-center justify-center">
      <Head>
        <title>Midu Chat</title>
        <meta name="description" content="Chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user && <LoginForm />}
    </div>
  );
};

export default Home;
