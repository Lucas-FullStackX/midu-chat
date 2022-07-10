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
        setMessages(currentMessages.items);
      }
    };
    if (store.activeConversation) {
      store.activeConversation.on(
        'messageAdded',
        (message: {
          sid: string;
          body: string;
          author: string;
          dateCreated: Date;
        }) => {
          console.log('message', messages);
          setMessages([...messages, message]);
        }
      );
    }
    getMessages();
  }, []);

  return { messages };
};
