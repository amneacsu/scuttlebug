export default {
  __schema: {
    types: [
      {
        kind: 'UNION',
        name: 'MessageContent',
        possibleTypes: [
          {
            name: 'UnhandledMessage',
          },
          {
            name: 'AboutMessage',
          },
          {
            name: 'ChannelMessage',
          },
          {
            name: 'ContactMessage',
          },
          {
            name: 'PostMessage',
          },
          {
            name: 'PubMessage',
          },
          {
            name: 'VoteMessage',
          },
          {
            name: 'DataMessage',
          },
        ],
      },
    ],
  },
};
