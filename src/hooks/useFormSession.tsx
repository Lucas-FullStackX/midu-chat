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
  const [error, setError] = useState(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let user;
      if (type === TypeOptions.login) {
        user = await onLogin(form);
        router.push('/chat');
      }
      if (type === TypeOptions.register) {
        user = await onSingUp(form);
      }
      dispatch({ type: ChatActionsTypes.SET_USER, payload: user });
    } catch (e: any) {
      setError(e);
    }
  };

  return { form, onChange, onSubmit, error };
};
