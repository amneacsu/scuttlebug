import * as React from 'react';
import { format } from 'date-fns';
import gql from 'graphql-tag';
import Content, { ContentFragment } from '../Content';
import Data from '../Data';
const css = require('./index.css');

export interface Props {
  sequence: number,
  timestamp: number,
  content: any,
  type: string,
  feed: {
    name: string,
  },
  data?: string,
};

const Message = (props: Props) => {
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
      <Content
        type={type}
        data={content}
      />

      <br />

      <Data>{data}</Data>
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
    data
  }
  ${ContentFragment}
`;

export default Message;
