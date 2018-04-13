import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Message, { MessageFragment } from './Message';
import Profile, { ProfileFragment } from './Profile';

const ReadFeed = gql`
  query ReadFeed($id: ID!, $limit: Int, $lt: Int) {
    feed(id: $id) {
      profile {
        ...ProfileFragment
      }
      messages(limit: $limit lt: $lt) {
        ...MessageFragment
      }
    }
  }
  ${ProfileFragment}
  ${MessageFragment}
`;

const COUNT = 20;

class Feed extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  fetchMore = (fetcher, after) => {
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
      <Query
        query={ReadFeed}
        variables={{ id, limit: COUNT }}
      >
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
              <Profile {...data.feed.profile} />
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
