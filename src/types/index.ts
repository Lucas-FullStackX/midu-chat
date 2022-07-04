import { User } from '@supabase/supabase-js';
import React from 'react';

export enum ChatActionsTypes {
  SET_USER = 'SET_USER',
  SET_ACTIVE_CONVERSATION = 'SET_ACTIVE_CONVERSATION'
}

export enum TypeOptions {
  login = 'login',
  register = 'register'
}

type ChatActions = {
  type: ChatActionsTypes;
  payload: User | any;
};
export interface ChatState {
  user: User | null;
  activeConversation: any;
}
export interface ChatContextProps {
  chatState: ChatState;
  dispatch: React.Dispatch<ChatActions>;
}
