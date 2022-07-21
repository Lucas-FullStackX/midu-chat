import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { UserConversationInstance } from 'twilio/lib/rest/conversations/v1/user/userConversation';

export const useFetchChats = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [chatList, setChatList] = useState<UserConversationInstance[]>([]);
  const { checkSession, user } = useUser();
  useEffect(() => {
    console.log('useFetchChats', user);
    const getConversation = async () => {
      const chats = await fetch(`/api/get-chats-list?identity=${user.email}`);
      console.log('chats', chats);
      const chatsList = await chats.json();
      setChatList(chatsList.conversations);
      setLoading(false);
    };
    if (user) {
      getConversation();
    } else {
      checkSession();
    }
  }, [user?.email]);
  return { loading, chatList };
};
