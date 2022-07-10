import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { getAccessToken } from '../services';
import { createOrJoinConversation } from '../services/chat';
import { ChatActionsTypes } from '../types';
import { useDispatch } from './useDispatch';
import { useStore } from './useStore';

export const useCheckStore = ({ room }: { room: string }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const store = useStore();
  const { user, accessToken: sbToken } = useUser();
  useEffect(() => {
    const getConversation = async () => {
      if (!store.activeConversation) {
        console.log(user);
        if (!sbToken) {
          setError('You must be logged in to chat');
          setLoading(false);
          return;
        }
        let accessToken;
        try {
          accessToken = await getAccessToken({ token: sbToken });
        } catch (e) {
          setLoading(false);
          setError('error getting access token');
          return;
        }

        let conversation;
        try {
          conversation = await createOrJoinConversation({
            room,
            accessToken,
            userName: user?.email ?? ''
          });
          console.log('conversation', conversation);
        } catch (e) {
          console.log(e);
        }

        if (conversation) {
          dispatch({
            type: ChatActionsTypes.SET_ACTIVE_CONVERSATION,
            payload: conversation
          });
          console.log('conversation', store);
        }
      }
    };
    getConversation();
  }, [store]);
  return { error, loading };
};
