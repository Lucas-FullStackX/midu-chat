import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getUser, User, withPageAuth } from '@supabase/auth-helpers-nextjs';

const Home: NextPage<{
  user: User;
  accessToken: string;
}> = ({ user, accessToken }: { user: User; accessToken: string }) => {
  const router = useRouter();
  const chatSID = router.query.chatSID as string;
  console.log('chatSID', chatSID);
  useEffect(() => {
    const res = async () => {
      try {
        const test = await fetch(
          `/api/add-participant?chatSID=${chatSID[0]}&identity=${user?.email}`
        );
        const { room } = await test.json();
        router.push(`/rooms/${room}`);
      } catch (e) {
        console.log(e);
      }
    };
    if (!user) {
      router.push({
        pathname: '/loginForm',
        query: {
          redirectTo: `/invitation/${chatSID}`
        }
      });
    } else {
      res();
    }
    console.log('user', user, accessToken);
  }, [user]);
  console.log('user', user, accessToken);
  return <p>Loading</p>;
};

export default Home;

export const getServerSideProps = withPageAuth({
  authRequired: false,
  async getServerSideProps(ctx) {
    // Access the user object
    const { user, accessToken } = await getUser(ctx);
    return { props: { user, accessToken } };
  }
});
