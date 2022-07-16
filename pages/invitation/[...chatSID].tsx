import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getUser, User, withPageAuth } from '@supabase/auth-helpers-nextjs';

const Home: NextPage<{
  user: User;
}> = ({ user }: { user: User }) => {
  const router = useRouter();
  const chatSID = router.query.chatSID as string;
  console.log('chatSID', chatSID);
  useEffect(() => {
    fetch(`/api/add-participant?chatSID=${chatSID[0]}&identity=${user?.email}`);
  }, []);
  console.log('user', user);
  return <p>Loading</p>;
};

export default Home;

export const getServerSideProps = withPageAuth({
  redirectTo: '/',
  async getServerSideProps(ctx) {
    // Access the user object
    const { user, accessToken } = await getUser(ctx);
    return { props: { user, accessToken } };
  }
});
