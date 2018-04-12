import * as React from 'react';
import { format } from 'date-fns';
import gql from 'graphql-tag';
import Content, { ContentFragment } from '../Content';
const css = require('./index.css');

export interface Props {
  sequence: number,
  timestamp: number,
  content: any,
  type: string,
  feed: {
    name: string,
  },
};

const Message = (props: Props) => {
  const {
    sequence,
    timestamp,
    type,
    content,
    feed,
  } = props;

  return (
    <div className={css.Message}>
      <div>
        Sequence: {sequence}
      </div>
      <div>
        Datetime: {format(timestamp, 'YYYY-MM-DD HH:mm:ss')}
      </div>
      <div>
        Author: {feed.name || 'no name'}
      </div>
      <div>
        type: {type}
      </div>

      <Content
        type={type}
        data={content}
      />
    </div>
  );
};

export const MessageFragment = gql`
  fragment MessageFragment on Message {
    sequence
    timestamp
    type
    feed {
      name
    }
    content {
      ...ContentFragment
    }
  }
  ${ContentFragment}
`;

export default Message;
