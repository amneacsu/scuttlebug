const {
  getId,
  getFeedInfo,
  getFeedItems,
  getLinks,
  getMessage,
} = require('../sbot');

module.exports = {
  Query: {
    feed: (obj, args, { sbot }) => getFeedInfo(args.id, sbot),
    message: (obj, args, { sbot }) => getMessage(args.id, sbot),
    me: (obj, args, { sbot }) => getId(sbot).then((id) => getFeedInfo(id, sbot)),
    whoami: (obj, args, { sbot }) => getId(sbot),
  },

  Feed: {
    messages: (obj, args, { sbot }) => {
      return getFeedItems({
        id: obj.id,
        limit: args.limit || 10,
        reverse: args.reverse,
      }, sbot);
    },
  },

  Link: {
    message: (obj, args, { sbot }) => getMessage(obj.key, sbot),
  },

  Message: {
    type: (obj) => obj.content.type || 'data',
    feed: (obj, args, { sbot }) => getFeedInfo(obj.author, sbot),
    links: (obj, args, { sbot }) => getLinks({ dest: obj.key, rel: args.rel }, sbot),
  },

  DataMessage: {
    __isTypeOf: (obj) => obj.type === undefined,
    data: (obj) => obj,
  },

  AboutMessage: {
    __isTypeOf: (obj) => obj.type === 'about',
    feed: (obj, args, { sbot }) => getFeedInfo(obj.about, sbot),
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
};
