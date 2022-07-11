import { useEffect, useState } from 'react';
import { useStore } from './useStore';

export const useMessages = () => {
  const store = useStore();
  const [messages, setMessages] = useState<
    {
      sid: string;
      body: string;
      author: string;
      dateCreated: Date;
    }[]
  >([]);
  useEffect(() => {
    const getMessages = async () => {
      if (store.activeConversation) {
        const currentMessages = await store.activeConversation.getMessages();
        console.log('currentMessages', currentMessages);
        setMessages(currentMessages.items);
      }
    };
    getMessages();
  }, [store.activeConversation]);
  if (store.activeConversation) {
    store.activeConversation.on(
      'messageAdded',
      (message: {
        sid: string;
        body: string;
        author: string;
        dateCreated: Date;
      }) => {
        console.log('messageHOOK', messages);
        setMessages([...messages, message]);
      }
    );
  }

  return { messages };
};
