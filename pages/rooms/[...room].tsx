import React, { useEffect } from 'react';
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
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && messages.length) {
      console.log('scroll to bottom');
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  return (
    <div className="mx-auto mr-8 ml-8 grid max-h-screen max-w-6xl grid-cols-1 grid-rows-[50px_85vh_auto] py-2">
      <h2>{room}</h2>
      <div className="h-full overflow-x-hidden">
        {messages.map((message) => (
          <Message key={message.sid} message={message} />
        ))}
        <div ref={ref} />
      </div>
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
