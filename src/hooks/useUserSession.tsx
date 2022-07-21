import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ChatContext } from '../context/ChatContext';
import { ChatActionsTypes } from '../types';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';

export const useGetSession = () => {
  const { dispatch } = useContext(ChatContext);
  const [status, setStatus] = useState(200);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const user = supabaseClient.auth.user();
      const {
        data,
        error: err,
        status: state
      } = await supabaseClient
        .from('profiles')
        .select('username, website, avatar_url')
        .eq('id', user?.id ?? '')
        .single();
      setStatus(state);
      if (err) {
        setError(error);
      }
      if (data) {
        dispatch({
          type: ChatActionsTypes.SET_USER,
          payload: data
        });
        router.push('/chat');
      }
    };
    getUser();
  }, []);
  return {
    status,
    error
  };
};
