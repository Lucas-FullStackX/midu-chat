import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useStore } from '../../src/hooks/useStore';
import { MessageInput } from '../../src/components/MessagesInput';

const Home: NextPage = () => {
  const router = useRouter();
  const room = router.query.room as string;
  const store = useStore();
  console.log('store', store);
  const [messages, setMessages] = React.useState([]);
  useEffect(() => {
    const getMessages = async () => {
      if (store.activeConversation) {
        const currentMessages = await store.activeConversation.getMessages();
        setMessages(currentMessages.items);
        store.activeConversation.on('messageAdded', (message) => {
          setMessages([...messages, message]);
        });
      }
    };

    getMessages();
  }, []);
  console.log('messages', messages);
  return (
    <div className="container flex h-full min-h-screen content-center justify-center">
      <h2>{room}</h2>
      <MessageInput />
    </div>
  );
};

export default Home;
