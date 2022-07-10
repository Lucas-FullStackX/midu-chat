import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const room = router.query.room as string;
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      router.push(`/rooms/${room}`);
    } else {
      router.push('/');
    }
  }, [user]);
  console.log('user', user);
  return <p>Loading</p>;
};

export default Home;
