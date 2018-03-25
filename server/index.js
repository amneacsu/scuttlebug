const express = require('express');
const graphqlHTTP = require('express-graphql');
const ssbClient = require('ssb-party');

const PORT = 3040;
const schema = require('./schema');
const app = express();

console.log('Starting ssb client...');

ssbClient({ party: {
  // out: false
} }, (err, sbot) => {
  if (err) {
    throw new Error(err);
  }

  console.log('Starting GraphQL server...');
  app.use('/graphql', graphqlHTTP({
    schema,
    context: { sbot },
    graphiql: true,
  }));

  console.log(`Server listening on port ${PORT}...`);
  app.listen(PORT);
});
