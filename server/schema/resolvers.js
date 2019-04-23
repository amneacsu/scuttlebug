const {
  getId,
  getFeedInfo,
  getFeedItems,
  getChannelItems,
  getLinks,
  getMessage,
} = require('../sbot');

module.exports = {
  Query: {
    feed: (obj, args) => ({ id: args.id }),
    channel: (obj, args) => args.name,
    message: (obj, args, { sbot }) => getMessage(args.id, sbot),
    me: (obj, args, { sbot }) => getId(sbot),
    whoami: (obj, args, { sbot }) => getId(sbot).then((me) => me.id),
  },

  Feed: {
    profile: (obj, args, { sbot }) => getFeedInfo(obj.id, sbot),
    messages: (obj, args, { sbot }) => {
      return getFeedItems({
        id: obj.id,
        ...args,
        limit: args.limit || 10,
        reverse: args.reverse === undefined ? true : args.reverse,
      }, sbot);
    },
  },

  Channel: {
    messages: (obj, args, { sbot }) => {
      return getChannelItems(obj, {
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
    feed: (obj) => ({ id: obj.author }),
    links: (obj, args, { sbot }) => getLinks({ dest: obj.key, rel: args.rel }, sbot),
    data: (obj) => JSON.stringify(obj, null, 2),
  },

  EncryptedMessage: {
    __isTypeOf: (obj) => typeof obj === 'string',
    data: (obj) => obj,
  },

  AboutMessage: {
    __isTypeOf: (obj) => obj.type === 'about',
    feed: (obj) => ({ id: obj.about }),
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
    contact: (obj) => ({ id: obj.contact }),
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
