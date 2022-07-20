import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MessageInput } from '../../src/components/MessagesInput';
import { Message } from '../../src/components/Message';
import { useMessages } from '../../src/hooks/useMessages';
import { useCheckStore } from '../../src/hooks/useCheckStore';
import { getUser, User, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { ButtonClip } from '../../src/components/ButtonClip';
import { useStore } from '../../src/hooks/useStore';
import { NavBar } from '../../src/components/NavBar';

const Home: NextPage<{
  user: User;
  accessToken: string;
}> = ({ user, accessToken }: { user: User; accessToken: string }) => {
  const router = useRouter();
  const store = useStore();
  const [route, setRoute] = React.useState('');

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
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (window) {
      setRoute(window.location.host);
    }
  }, [messages]);
  console.log('messages', messages);
  return (
    <div className="mx-auto mr-8 ml-8 grid max-h-screen max-w-6xl grid-cols-1 grid-rows-[55px_80vh_auto] py-2">
      <NavBar
        copyText={`${route}/invitation/${store.activeConversation?.sid}`}
        title={room}
      />
      <div className="scrollbar-thumb-rounded-full h-full overflow-hidden overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-slate-600">
        {messages.map((message, index) => (
          <Message
            key={message.sid}
            message={message}
            isNext={
              index < messages.length - 1 &&
              message.author !== messages[index + 1]?.author
            }
            isPrevious={
              messages.length > 1 &&
              message.author !== messages[index - 1]?.author
            }
          />
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
