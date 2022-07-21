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
  isNext?: boolean;
  isPrevious?: boolean;
}

export const Message: FunctionComponent<MessageProps> = ({
  message,
  isNext,
  isPrevious
}) => {
  const { author, body, dateCreated } = message;
  const { user } = useUser();
  const hash = md5(author);
  const createdAt = dayjs(dateCreated).format('HH:mm');
  const isAuthor = author === user?.email;
  return (
    <div
      className={`mt-4 mb-4 flex items-center ${
        isAuthor ? 'justify-end' : 'justify-start'
      } space-x-4 space-y-1`}
    >
      <>
        {isAuthor ? (
          <>
            <div className="max-w-2/3 w-auto rounded-lg bg-blue-500 p-2 font-medium text-white">
              <p className="text-white">{body}</p>
              <p className="text-right text-xs text-slate-300">{createdAt}</p>
            </div>
            {isNext ? (
              <img
                className="h-8 w-8 rounded-full"
                src={`https://www.gravatar.com/avatar/${hash}?d=identicon`}
                alt={author}
              />
            ) : (
              <div className="w-8" />
            )}
          </>
        ) : (
          <>
            {isPrevious ? (
              <img
                className="h-8 w-8 rounded-full"
                src={`https://www.gravatar.com/avatar/${hash}?d=identicon`}
                alt={author}
              />
            ) : (
              <div className="w-8" />
            )}
            <div className="max-w-2/3 relative w-auto rounded-lg  bg-slate-800 p-2 font-medium dark:text-white">
              {isPrevious && (
                <span className="absolute -top-5 truncate text-xs">
                  {author.split('@')[0]}
                </span>
              )}
              <p className="text-white">{body}</p>
              <p className="text-xs text-slate-500">{createdAt}</p>
            </div>
          </>
        )}
      </>
    </div>
  );
};
