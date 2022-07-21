import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { getAccessToken } from '../services';
import { createOrJoinConversation } from '../services/chat';
import { ChatActionsTypes } from '../types';
import { useDispatch } from './useDispatch';
import { useStore } from './useStore';

export const useCheckStore = ({
  room,
  sbToken,
  user
}: {
  room: string;
  sbToken: string;
  user: User;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const store = useStore();
  useEffect(() => {
    const getConversation = async () => {
      if (!store.activeConversation) {
        if (!sbToken) {
          setError('You must be logged in to chat');
          setLoading(false);
          return;
        }

        const accessToken = await getAccessToken({ token: sbToken });

        const conversation = await createOrJoinConversation({
          room,
          accessToken,
          userName: user?.email ?? ''
        });

        if (conversation) {
          dispatch({
            type: ChatActionsTypes.SET_ACTIVE_CONVERSATION,
            payload: conversation
          });
        }
      }
    };
    getConversation();
  }, []);
  return { error, loading };
};
