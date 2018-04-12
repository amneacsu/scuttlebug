const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const ssbClient = require('ssb-party');
const fileType = require('file-type');

const PORT = 3040;
const schema = require('./schema');
const { getBlob } = require('./sbot');

console.log('Starting ssb client...');

ssbClient({ party: {
  // out: false
} }, (err, sbot) => {
  if (err) {
    throw new Error(err);
  }

  console.log('Starting GraphQL server...');

  const app = express();
  app.use('/graphql', cors(), graphqlHTTP({
    schema,
    context: { sbot },
    graphiql: true,
  }));

  app.get('/blob/*', (req, res) => {
    const key = req.params[0];

    getBlob(key, sbot, (err, data) => {
      if (err) {
        res.status(400);
        res.end(err.message);
      } else {
        const ft = fileType(data);
        res.setHeader('Content-Type', ft.mime);
        res.end(data, 'binary');
      }
    });
  });

  console.log(`Server listening on port ${PORT}...`);
  app.listen(PORT).on('error', (error) => {
    console.error(error.message);
    process.exit(1);
  });
});
