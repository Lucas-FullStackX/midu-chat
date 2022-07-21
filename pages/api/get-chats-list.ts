import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import { UserConversationInstance } from 'twilio/lib/rest/conversations/v1/user/userConversation';
import {
  SERVICE_SID,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
} from '../../src/constants/index';

type Data = {
  conversations?: UserConversationInstance[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { identity } = req.query;
  if (!identity) {
    return res.status(400).json({ error: 'Missing identity' });
  }
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  let users;
  try {
    users = await client.chat.v2.services(SERVICE_SID).users.list();
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      // 👉️ err is type Error here
      res.status(500).json({ error: e.message });
    }
  }
  try {
    console.log(users);
    if (users) {
      const user = users.find((user) => user.identity === identity);
      if (user) {
        const conversations = await client.conversations.v1
          .users(user.sid)
          .userConversations.list();
        res.json({ conversations });
      }
    }
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      // 👉️ err is type Error here
      res.status(500).json({ error: e.message });
    }
  }
}
