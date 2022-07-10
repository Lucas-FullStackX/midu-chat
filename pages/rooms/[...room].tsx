import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MessageInput } from '../../src/components/MessagesInput';
import { Message } from '../../src/components/Message';
import { useMessages } from '../../src/hooks/useMessages';
import { useCheckStore } from '../../src/hooks/useCheckStore';

const Home: NextPage = () => {
  const router = useRouter();
  const room = router.query.room as string;
  const { loading, error } = useCheckStore({
    room
  });
  const { messages } = useMessages();
  console.log(error, loading);
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
