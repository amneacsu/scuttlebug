import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import client from './core/graphql-client';
import Home from './views/Home';
import Feed from './views/Feed';
import RouteNav from './modules/RouteNav';
import './App.css';

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
