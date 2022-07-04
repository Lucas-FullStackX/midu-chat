import React, { useReducer } from 'react';
import { ChatState } from '../types';
import { ChatContext } from './ChatContext';
import { chatReducer } from './ChatReducer';

const INITIAL_STATE: ChatState = {
  user: null,
  activeConversation: null
};

export const ChatContextProvider = ({
  children
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [chatState, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
