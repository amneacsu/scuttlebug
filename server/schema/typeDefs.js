module.exports = `
  type Query {
    feed(id: ID!): Feed
    message(id: ID!): Message
    whoami: ID!
    me: Feed!
  }

  type Feed {
    id: ID!
    name: String
    description: String
    profile: Profile
    messages(
      gt: Int
      gte: Int
      lt: Int
      lte: Int
      limit: Int
      reverse: Boolean
    ): [Message]
  }

  type Profile {
    name: String
    description: String
    image: String
  }

  type Address {
    key: ID!
    host: String!
    port: Int!
  }

  type Mention {
    link: String!
    name: String
    type: String
    size: Int
  }

  type Message {
    key: ID!
    previous: String
    feed: Feed!
    sequence: Int!
    timestamp: Float!
    hash: String!
    signature: String!
    content: MessageContent
    type: String!
    links(rel: String): [Link]
    data: String!
  }

  type Link {
    key: ID!
    rel: String!
    source: ID!
    dest: ID!
    message: Message!
  }

  union MessageContent = AboutMessage | ChannelMessage | ContactMessage | PostMessage | PubMessage | VoteMessage | EncryptedMessage | UnhandledMessage

  type AboutMessage {
    feed: Feed!
    name: String
    image: String
  }

  type ChannelMessage {
    channel: String!
    subscribed: Boolean!
  }

  type ContactMessage {
    contact: Feed!
    following: Boolean!
  }

  type PostMessage {
    text: String!
    mentions: [Mention]
  }

  type PubMessage {
    address: Address
  }

  type VoteMessage {
    vote: Vote!
  }

  type Vote {
    link: String!
    value: Int!
    expression: String
  }

  type EncryptedMessage {
    data: String
  }

  type UnhandledMessage {
    data: String
  }
`;
