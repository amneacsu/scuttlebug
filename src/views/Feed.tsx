import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Message, { MessageFragment } from './Message';

const ReadFeed = gql`
  query ReadFeed($id: ID!, $limit: Int, $lt: Int) {
    feed(id: $id) {
      messages(limit: $limit lt: $lt) {
        ...MessageFragment
      }
    }
  }
  ${MessageFragment}
`;

const COUNT = 20;

export interface Props {
  id: string,
};

class Feed extends React.Component<Props> {
  fetchMore = (fetcher: Function, after: number): Promise<object> => {
    return fetcher({
      variables: {
        lt: after,
        limit: COUNT,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

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
  }

  render() {
    const { id } = this.props;

    return (
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

          return (
            <div>
              {data.feed.messages.map((message, index) => (
                <Message
                  key={index}
                  {...message}
                />
              ))}

              <br /><br />

              <button onClick={() => {
                const last = data.feed.messages[data.feed.messages.length - 1];
                this.fetchMore(fetchMore, last.sequence);
              }}>
                fetch more
              </button>

              <br /><br />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Feed;
