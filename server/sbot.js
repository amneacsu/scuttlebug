const pull = require('pull-stream');
const ref = require('ssb-ref');

const getId = (sbot) => new Promise((resolve, reject) => {
  sbot.whoami((err, info) => { if (err) { reject(err); } resolve(info.id); });
});

const getFeedInfo = (id, sbot) => {
  return getLinks({ source: id, dest: id, rel: 'about' }, sbot).then((msgs) => {
    const profile = Object.keys(msgs)
      .map((key) => msgs[key])
      .reduce((profile, msg) => ({ ...profile, ...msg.value.content }), {});

    return { id, ...profile };
  });
};

const getFeedItems = (args, sbot) => new Promise((resolve, reject) => {
  const { id } = args;

  if (!ref.isFeedId(id)) {
    reject(new Error(`${id} is not a valid feed ID`));
  }

  pull(
    sbot.createUserStream(args),
    pull.collect((err, msgs) => {
      if (err) {
        reject(err);
      }

      resolve(msgs.map(msg => {
        // if (typeof msg.value.content === 'string') {
        //   sbot.private.unbox(msg.value.content, (err, result) => {
        //     console.log(err);
        //     console.log(result);
        //   });
        // }
        return ({ key: msg.key, ...msg.value });
      }));
    }),
  );
});

const getLinks = ({ source, dest, rel }, sbot) => new Promise((resolve, reject) => {
  if (!ref.isFeedId(source)) {
    reject(new Error(`${source} is not a valid feed ID`));
  }

  pull(
    sbot.links({ source, dest, rel, values: true }),
    pull.collect((err, msgs) => {
      if (err) {
        reject(err);
      }

      resolve(msgs);
    }),
  );
});

const getMessage = (id, sbot) => {
  return new Promise((resolve) => {
    sbot.get(id, (err, data) => {
      resolve({ key: id, ...data });
    });
  });
};

module.exports = {
  getId,
  getFeedInfo,
  getFeedItems,
  getLinks,
  getMessage,
};
