const {
  getId,
  getFeedInfo,
  getFeedItems,
  getLinks,
  getMessage,
} = require('../sbot');

module.exports = {
  Query: {
    feed: (obj, args) => args.id,
    message: (obj, args, { sbot }) => getMessage(args.id, sbot),
    me: (obj, args, { sbot }) => getId(sbot).then((id) => getFeedInfo(id, sbot)),
    whoami: (obj, args, { sbot }) => getId(sbot),
  },

  Feed: {
    profile: (obj, args, { sbot }) => getFeedInfo(obj, sbot),
    messages: (obj, args, { sbot }) => {
      return getFeedItems({
        id: obj,
        ...args,
        limit: args.limit || 10,
        reverse: args.reverse === undefined ? true : args.reverse,
      }, sbot);
    },
  },

  Profile: {
    image: (obj) => {
      if (typeof obj.image === 'string') {
        return obj.image;
      }

      if (typeof obj.image === 'object' && obj.image.link) {
        return obj.image.link;
      }

      return null;
    },
  },

  Link: {
    message: (obj, args, { sbot }) => getMessage(obj.key, sbot),
  },

  Message: {
    type: (obj) => obj.content.type || 'encrypted',
    feed: (obj) => obj.author,
    links: (obj, args, { sbot }) => getLinks({ dest: obj.key, rel: args.rel }, sbot),
    data: (obj) => JSON.stringify(obj, null, 2),
  },

  EncryptedMessage: {
    __isTypeOf: (obj) => typeof obj === 'string',
    data: (obj) => obj,
  },

  AboutMessage: {
    __isTypeOf: (obj) => obj.type === 'about',
    feed: (obj, args, { sbot }) => getFeedInfo(obj.about, sbot),
    image: (obj) => {
      if (typeof obj.image === 'string') {
        return obj.image;
      }

      if (typeof obj.image === 'object' && obj.image.link) {
        return obj.image.link;
      }

      return null;
    },
  },

  ChannelMessage: {
    __isTypeOf: (obj) => obj.type === 'channel',
  },

  ContactMessage: {
    __isTypeOf: (obj) => obj.type === 'contact',
    contact: (obj, args, { sbot }) => getFeedInfo(obj.contact, sbot),
  },

  PostMessage: {
    __isTypeOf: (obj) => obj.type === 'post',
  },

  PubMessage: {
    __isTypeOf: (obj) => obj.type === 'pub',
  },

  VoteMessage: {
    __isTypeOf: (obj) => obj.type === 'vote',
  },

  UnhandledMessage: {
    __isTypeOf: () => true,
    data: (obj) => JSON.stringify(obj),
  },
};
