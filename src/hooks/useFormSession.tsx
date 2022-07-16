import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { onLogin, onSingUp } from '../auth/supabaseClient';
import { ChatActionsTypes, TypeOptions } from '../types';
import { useDispatch } from './useDispatch';

type useFormSessionProps = {
  type: TypeOptions;
};

export const useFormSession = ({ type }: useFormSessionProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<Error | null>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let user;
      if (type === TypeOptions.login) {
        user = await onLogin(form);
        if (
          window.history.length > 1 &&
          document.referrer.indexOf(window.location.host) !== -1
        ) {
          router.back();
        } else {
          router.push('/chat');
        }
      }
      if (type === TypeOptions.register) {
        user = await onSingUp(form);
      }
      dispatch({ type: ChatActionsTypes.SET_USER, payload: user });
    } catch (err) {
      if (err instanceof Error) {
        // 👉️ err is type Error here
        console.log(err.message);
        setError(err);
      }
    }
  };

  return { form, onChange, onSubmit, error };
};
