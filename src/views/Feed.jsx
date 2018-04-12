import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Message from './Message';

const ReadFeed = gql`
  query ReadFeed($id: ID!, $limit: Int, $lt: Int) {
    feed(id: $id) {
      messages(limit: $limit lt: $lt) {
        sequence
        timestamp
        type
        feed {
          name
        }
        content {
          ... on ContactMessage {
            contact {
              id
              name
              description
            }
          }
          ... on PostMessage {
            text
          }
        }
      }
    }
  }
`;

const COUNT = 3;

const Feed = ({ id }) => (
  <div>
    <Query query={ReadFeed} variables={{ id, limit: COUNT }}>
      {({ data, loading, error, fetchMore }) => {
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

        const last = data.feed.messages[data.feed.messages.length - 1];

        return (
          <div>
            {data.feed.messages.map((message, index) => (
              <Message
                key={index}
                {...message}
              />
            ))}
            <button onClick={() => {
              fetchMore({
                variables: {
                  lt: last.sequence,
                  limit: COUNT,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;

                  console.log(prev);
                  console.log(fetchMoreResult);

                  return {
                    ...prev,
                    feed: {
                      ...prev.feed,
                      messages: [
                        ...prev.feed.messages,
                        ...fetchMoreResult.feed.messages,
                      ],
                    },
                  };
                },
              });
            }}>
              fetch more
            </button>
          </div>
        );
      }}
    </Query>
  </div>
);

export default Feed;
