import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import css from './HelloWorld.css';

const WHOAMI = gql`
{
  whoami
}
`;

const HelloWorld = () => {
  return (
    <Query query={WHOAMI}>
      {({ loading, error, data }) => {
        if (loading) {
          return 'loading...';
        }

        if (error) {
          return error.message;
        }

        if (data.whoami) {
          return (
            <div className={css.HelloWorld}>
              Hello, world! I am {data.whoami}
            </div>
          );
        }
      }}

    </Query>
  );
};

export default HelloWorld;
