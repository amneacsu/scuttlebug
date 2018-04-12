import * as React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

export interface Props {
  text: string,
};

const style = {
  fontSize: 14,
  color: '#666',
  borderLeft: '#aaa 3px solid',
  paddingLeft: 12,
  lineHeight: '145%',
};

const PostMessage = ({
  text,
}: Props) => {
  return (
    <p style={style}>{text}</p>
  );
};

export const PostMessageFragment = gql`
  fragment PostMessageFragment on PostMessage {
    ... on PostMessage {
      text
    }
  }
`;

export default PostMessage;
