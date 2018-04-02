import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './views/Home';
import Feed from './views/Feed';
import RouteNav from './modules/RouteNav';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:3040/graphql',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <RouteNav />

          <Route exact path="/" component={Home}/>
          <Route exact path="/all" component={Feed}/>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
