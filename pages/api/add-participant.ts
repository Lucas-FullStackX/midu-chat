import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
} from '../../src/constants/index';

type Data = {
  name?: string;
  error?: string;
  data?: any;
  room?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { chatSID, identity } = req.query;
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  if (!chatSID || !identity) {
    return res.status(400).json({ error: 'Missing chatSID or identity' });
  }
  const uniqueName = await client.conversations.v1
    .conversations(chatSID as string)
    .fetch()
    .then((conversation) => {
      return conversation.uniqueName;
    });
  console.log('name', uniqueName);
  try {
    const participant = await client.conversations.v1
      .conversations(chatSID as string)
      .participants.create({ identity: identity as string });

    res.json({ data: participant, room: uniqueName });
  } catch (err) {
    if (err instanceof Error) {
      // 👉️ err is type Error here
      console.error(err);
      if (err.message.toLowerCase().includes('already exists')) {
        res.json({ data: err.message, room: uniqueName });
      }
      res.status(500).json({ error: err.message });
    }
  }
}
