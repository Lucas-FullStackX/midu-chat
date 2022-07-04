import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
export const useStore = () => {
  const { chatState } = useContext(ChatContext);
  return chatState;
};
