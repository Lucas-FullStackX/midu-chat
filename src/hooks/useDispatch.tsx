import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
export const useDispatch = () => {
  const { dispatch } = useContext(ChatContext);
  return dispatch;
};
