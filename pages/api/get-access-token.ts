// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import {
  SERVICE_SID,
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET
} from '../../src/constants';

type Data = {
  accessToken?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { jwt } = req.headers;
  if (!jwt) {
    res.status(400).json({ error: 'Missing jwt' });
    return;
  }
  const user = await supabaseClient.auth.api.getUser(jwt as string);
  const identity = user?.data?.email;
  if (identity == null) return { status: 401 };
  const { AccessToken } = twilio.jwt;
  const { ChatGrant } = AccessToken;

  const accessToken = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET,
    {
      identity
    }
  );

  const conversationsGrant = new ChatGrant({
    serviceSid: SERVICE_SID
  });

  accessToken.addGrant(conversationsGrant);

  res.status(200).json({ accessToken: accessToken.toJwt() });
}
