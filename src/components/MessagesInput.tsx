/* eslint-disable linebreak-style */
import React, { FunctionComponent, useState } from 'react';
import { useStore } from '../hooks/useStore';

interface LoginFormProps {}

export const MessageInput: FunctionComponent<LoginFormProps> = () => {
  const store = useStore();
  const [message, setMessage] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  console.log('store', store);
  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      try {
        await store.activeConversation.sendMessage(message);
        setMessage('');
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div>
      <input
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={message}
        name="message"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
        placeholder="send your message"
        required
      />
    </div>
  );
};
