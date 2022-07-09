import { Client } from '@twilio/conversations';

export const createOrJoinConversation = async ({
  room,
  accessToken
}: {
  room: string;
  accessToken: string;
}) => {
  const client = new Client(accessToken);
  return new Promise((resolve) => {
    client.on('stateChanged', async (state) => {
      console.log(state);

      if (state === 'initialized') {
        let conversation;
        console.log('here2');

        try {
          conversation = await client.createConversation({ uniqueName: room });
          console.log('here3');

          // await conversation?.add('ma')
          // await conversation?.add('mb')
        } catch (e) {
          console.error(e);
          console.log('here3.2');

          try {
            conversation = await client.getConversationByUniqueName(room);

            // await conversation?.add('ma')
            // await conversation?.add('mb')
          } catch (e) {
            console.error(e);
          }
        }

        conversation?.add('quittojicoippo-7625@yopmail.com');
        resolve(conversation);
      }
    });
  });
};
