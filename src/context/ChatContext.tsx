import { createContext } from 'react';
import { ChatContextProps } from '../types';

export const ChatContext = createContext<ChatContextProps>(
  {} as ChatContextProps
);
