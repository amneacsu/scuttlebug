import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ReadFeed = gql`
  query ReadFeed($id: ID!) {
    feed(id: $id) {
      messages {
        type

        content {
          ... on ContactMessage {
            contact {
              name
              description
            }
          }
        }
      }
    }
  }
`;

const Message = (props) => {
  const {
    type,
  } = props;

  return (
    <div>
      {JSON.stringify(props)}
    </div>
  );
};

const Feed = ({ id }) => (
  <div>
    <Query query={ReadFeed} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading) {
          return 'loading...';
        }

        if (error) {
          console.log(error);
          return error.message;
        }

        if (!data.feed) {
          return null;
        }

        return data.feed.messages.map((message, index) => (
          <Message
            key={index}
            {...message}
          />
        ));
      }}
    </Query>
  </div>
);

export default Feed;
