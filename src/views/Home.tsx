import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Feed from './Feed';

const ReadUser = gql`
  query ReadUser {
    me {
      id
    }
  }
`;

const Home = () => (
  <div>
    <Query query={ReadUser}>
      {({ data }) => (
        data.me ? <Feed id={data.me.id} /> : null
      )}
    </Query>
  </div>
);

export default Home;
