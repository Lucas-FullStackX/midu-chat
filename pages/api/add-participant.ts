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
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { chatSID, identity } = req.query;
  console.log(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  if (!chatSID || !identity) {
    return res.status(400).json({ error: 'Missing chatSID or identity' });
  }
  client.conversations.v1
    .conversations(chatSID as string)
    .participants.create({ identity: identity as string })
    .then((participant) => res.json({ data: participant }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}
