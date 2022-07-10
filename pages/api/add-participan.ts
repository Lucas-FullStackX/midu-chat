import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { chatSID, identity } = req.query;
  const client = twilio(
    'ACd3bf721856987744f82d2c352c0c117d',
    '21877a42790f3fa8692fb472c0199b81'
  );
  if (!chatSID || !identity) {
    res.status(400).json({ error: 'Missing chatSID or identity' });
    return;
  }
  client.conversations.v1
    .conversations(chatSID as string)
    .participants.create({ identity: identity as string })
    .then((participant) => console.log(participant.sid))
    .catch((err) => res.status(500).json({ error: err }));
  try {
    const { data } = await axios.get(
      'https://conversations.twilio.com/v1/Services/IS795782ed37304fb882d2265f181d5c32/Conversations/CHc5e5913ebac245ca98d8018b37719ec4/Participants',
      {
        auth: {
          username: 'ACd3bf721856987744f82d2c352c0c117d',
          password: '21877a42790f3fa8692fb472c0199b81'
        }
      }
    );
    console.log(data);
    res.status(200).json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
