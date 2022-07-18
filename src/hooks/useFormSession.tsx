import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { onLogin, onSingUp } from '../auth/supabaseClient';
import { ChatActionsTypes, TypeOptions } from '../types';
import { useDispatch } from './useDispatch';

type useFormSessionProps = {
  type: TypeOptions;
  redirectTo?: string;
};

export const useFormSession = ({ type, redirectTo }: useFormSessionProps) => {
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
      }
      if (type === TypeOptions.register) {
        user = await onSingUp(form);
      }
      dispatch({ type: ChatActionsTypes.SET_USER, payload: user });
      console.log('here:', redirectTo);
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push('/chat');
      }
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
