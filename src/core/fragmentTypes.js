export default {
  __schema: {
    types: [
      {
        "kind": "UNION",
        "name": "MessageContent",
        "possibleTypes": [
          {
            "name": "AboutMessage",
          },
          {
            "name": "ChannelMessage",
          },
          {
            "name": "ContactMessage",
          },
          {
            "name": "PostMessage",
          },
          {
            "name": "PubMessage",
          },
          {
            "name": "VoteMessage",
          },
          {
            "name": "DataMessage",
          },
        ],
      },
    ],
  },
};
