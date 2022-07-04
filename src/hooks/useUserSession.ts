import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ChatContext } from '../context/ChatContext';
import { supabase } from '../auth/supabaseClient';
import { ChatActionsTypes } from '../types';

export const useGetSession = () => {
  const { dispatch } = useContext(ChatContext);
  const [status, setStatus] = useState(200);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const user = supabase.auth.user();
      console.log('hook', user);
      const {
        data,
        error: err,
        status: state
      } = await supabase
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
