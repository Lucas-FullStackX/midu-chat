import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { getAccessToken } from '../src/services';
import { createOrJoinConversation } from '../src/services/chat';
import { useDispatch } from '../src/hooks/useDispatch';
import { ChatActionsTypes } from '../src/types';
import { useRouter } from 'next/router';
import { User, useUser } from '@supabase/auth-helpers-react';
import { withPageAuth, getUser } from '@supabase/auth-helpers-nextjs';
import { useFetchChats } from '../src/hooks/useFetchChats';

const Chat: NextPage<{
  user: User;
}> = ({ user }: { user: User }) => {
  const { accessToken: sbToken, checkSession } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();
  const [room, setRoom] = React.useState('');
  const [accessToken, setAccessToken] = React.useState('');
  const { chatList } = useFetchChats();
  console.log('chatList', chatList);
  useEffect(() => {
    checkSession();
    const getToken = async () => {
      if (sbToken) {
        try {
          const token = await getAccessToken({ token: sbToken });
          setAccessToken(token);
          return token;
        } catch (e) {
          console.log(e);
        }
      }
    };
    getToken();
  }, [accessToken]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let conversation;
    try {
      conversation = await createOrJoinConversation({
        room,
        accessToken,
        userName: user?.email ?? ''
      });
    } catch (e) {
      console.log(e);
    }

    if (conversation) {
      dispatch({
        type: ChatActionsTypes.SET_ACTIVE_CONVERSATION,
        payload: conversation
      });
      router.push(`/rooms/${room}`);
    }
  };
  return (
    <div className="container flex h-full min-h-screen content-center justify-center">
      <form onSubmit={onSubmit}>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Create a new room
        </label>
        <input
          id="room-select"
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-center text-2xl uppercase text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mb-2 mt-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Chat;
export const getServerSideProps = withPageAuth({
  redirectTo: '/',
  async getServerSideProps(ctx) {
    // Access the user object
    const { user } = await getUser(ctx);
    return { props: { user } };
  }
});
