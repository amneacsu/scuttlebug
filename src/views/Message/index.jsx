import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Content, { ContentFragment } from '../Content';
import Data from '../Data';
import Blob from '../Blob';
import css from './index.css';

import Debug from './Debug';

const Message = (props) => {
  const {
    sequence,
    timestamp,
    type,
    content,
    feed,
    data,
  } = props;

  return (
    <div className={css.Message}>
      {feed.profile.image && <div>
        <Blob id={feed.profile.image} width={32} height={32} />
      </div>}

      <Content
        type={type}
        data={content}
      />

      <br />

      <Debug>
        <Data>{data}</Data>
      </Debug>
    </div>
  );
};

Message.propTypes = {
  sequence: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.any,
  feed: PropTypes.any,
  data: PropTypes.any,
};

export const MessageFragment = gql`
  fragment MessageFragment on Message {
    sequence
    timestamp
    type
    feed {
      profile {
        name
        image
      }
    }
    content {
      ...ContentFragment
    }
    data
  }
  ${ContentFragment}
`;

export default Message;
