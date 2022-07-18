import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LoginForm } from '../src/components/LoginForm';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

const Home: NextPage = () => {
  const router = useRouter();
  const redirectTo = router.query.redirectTo as string;

  console.log('redirectTo', redirectTo);
  return (
    <div className="container flex h-full min-h-screen content-center justify-center">
      <LoginForm redirectTo={redirectTo} />
    </div>
  );
};

export default Home;

export const getServerSideProps = withPageAuth({
  authRequired: false
});
