const pull = require('pull-stream');
const ref = require('ssb-ref');

const getId = (sbot) => new Promise((resolve, reject) => {
  sbot.whoami((err, info) => { if (err) { reject(err); } resolve(info); });
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

const getChannelItems = (channel, args, sbot) => new Promise((resolve, reject) => {
  const {
    limit,
  } = args;

  let i = 0;

  pull(
    sbot.createFeedStream(),
    pull.filter((msg) => {
      i++;
      if (msg.value.content && msg.value.content.channel) {
        return msg.value.content.channel === channel;
      }

      return false;
    }),
    pull.take(limit),
    pull.collect((err, msgs) => {
      console.log(i);
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

const getBlob = (id, sbot, cb) => {
  sbot.blobs.want(id, (err) => {
    if (err) cb(err);

    pull(
      sbot.blobs.get(id),
      pull.collect(function (err, values) {
        if (err) cb(err);
        else cb(null, Buffer.concat(values));
      })
    );
  });
};

module.exports = {
  getId,
  getFeedInfo,
  getFeedItems,
  getChannelItems,
  getLinks,
  getMessage,
  getBlob,
};
