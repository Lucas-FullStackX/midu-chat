import { User } from '@supabase/supabase-js';
import { ChatActionsTypes, ChatState } from '../types';

type ChatAction = { type: ChatActionsTypes; payload: User | null };

export const chatReducer = (
  state: ChatState,
  action: ChatAction
): ChatState => {
  switch (action.type) {
    case ChatActionsTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case ChatActionsTypes.SET_ACTIVE_CONVERSATION:
      return {
        ...state,
        activeConversation: action.payload
      };

    default:
      return state;
  }
};
