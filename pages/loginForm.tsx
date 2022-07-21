import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LoginForm } from '../src/components/LoginForm';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Head from 'next/head';

const LoginFormPage: NextPage = () => {
  const router = useRouter();
  const redirectTo = router.query.redirectTo as string;
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex h-full min-h-screen w-screen content-center justify-center">
        <LoginForm redirectTo={redirectTo} />
      </div>
    </>
  );
};

export default LoginFormPage;

export const getServerSideProps = withPageAuth({
  authRequired: false
});
