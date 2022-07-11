import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MessageInput } from '../../src/components/MessagesInput';
import { Message } from '../../src/components/Message';
import { useMessages } from '../../src/hooks/useMessages';
import { useCheckStore } from '../../src/hooks/useCheckStore';
import { getUser, User, withPageAuth } from '@supabase/auth-helpers-nextjs';

const Home: NextPage<{
  user: User;
  accessToken: string;
}> = ({ user, accessToken }: { user: User; accessToken: string }) => {
  const router = useRouter();
  const room = router.query.room as string;
  console.log('room', room);
  useCheckStore({
    room: room[0],
    user,
    sbToken: accessToken
  });
  const { messages } = useMessages();
  console.log('messages', messages);
  return (
    <div className="relative mx-auto mr-8 ml-8 max-w-6xl py-2">
      <h2>{room}</h2>
      <br />
      {messages.map((message) => (
        <Message key={message.sid} message={message} />
      ))}
      <MessageInput />
    </div>
  );
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
