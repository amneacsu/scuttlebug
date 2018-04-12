const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const ssbClient = require('ssb-party');

const PORT = 3040;
const schema = require('./schema');

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

  console.log(`Server listening on port ${PORT}...`);
  app.listen(PORT).on('error', (error) => {
    console.error(error.message);
    process.exit(1);
  });
});
