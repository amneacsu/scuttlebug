import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import HelloWorld from './HelloWorld';

const client = new ApolloClient({
  uri: 'http://localhost:3040/graphql',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <HelloWorld />
    </ApolloProvider>
  );
};

export default App;
