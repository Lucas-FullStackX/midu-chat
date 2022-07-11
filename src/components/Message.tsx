/* eslint-disable multiline-ternary */
/* eslint-disable linebreak-style */
import React, { FunctionComponent } from 'react';
import md5 from 'md5';
import dayjs from 'dayjs';
import { useUser } from '@supabase/auth-helpers-react';
interface MessageProps {
  message: {
    body: string;
    author: string;
    dateCreated: Date;
  };
}

export const Message: FunctionComponent<MessageProps> = ({ message }) => {
  const { author, body, dateCreated } = message;
  const { user } = useUser();
  const hash = md5(author);
  const createdAt = dayjs(dateCreated).format('HH:mm');
  const isAuthor = author === user?.email;
  return (
    <div
      className={`flex  items-center ${
        isAuthor ? 'justify-end' : 'justify-start'
      } space-x-4 space-y-1`}
    >
      <>
        {isAuthor ? (
          <>
            <div className="w-2/3 rounded-lg border border-cyan-600 p-2 font-medium dark:text-white">
              <p className="text-slate-900">{body}</p>
              <p className="text-xs text-slate-500">{createdAt}</p>
            </div>
            <img
              className="h-8 w-8 rounded-full"
              src={`https://www.gravatar.com/avatar/${hash}?d=identicon`}
              alt={author}
            />
          </>
        ) : (
          <>
            <img
              className="h-8 w-8 rounded-full"
              src={`https://www.gravatar.com/avatar/${hash}?d=identicon`}
              alt={author}
            />
            <div className="w-2/3 rounded-lg border border-cyan-600 p-2 font-medium dark:text-white">
              <p className="text-slate-900">{body}</p>
              <p className="text-xs text-slate-500">{createdAt}</p>
            </div>
          </>
        )}
      </>
    </div>
  );
};
