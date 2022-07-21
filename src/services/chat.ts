import { Client } from '@twilio/conversations';
export const createOrJoinConversation = async ({
  room,
  accessToken,
  userName
}: {
  room: string;
  accessToken: string;
  userName: string;
}) => {
  const client = new Client(accessToken);
  return new Promise((resolve) => {
    client.on('stateChanged', async (state) => {
      if (state === 'initialized') {
        let conversation;

        try {
          conversation = await client.getConversationByUniqueName(room);
          conversation = await client.getConversationBySid(room);
          console.log('here3');

          // await conversation?.add('ma')
          // await conversation?.add('mb')
        } catch (e) {
          console.error(e);

          try {
            conversation = await client.createConversation({
              uniqueName: room
            });

            // await conversation?.add('ma')
            // await conversation?.add('mb')
          } catch (e) {
            console.error(e);
          }
        }

        conversation?.add(userName);
        resolve(conversation);
      }
    });
  });
};
