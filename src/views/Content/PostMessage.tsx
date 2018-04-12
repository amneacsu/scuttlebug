import * as React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

export interface Props {
  text: string,
};

const PostMessage = ({
  text,
}: Props) => {
  return <span>{text}</span>;
};

export const PostMessageFragment = gql`
  fragment PostMessageFragment on PostMessage {
    ... on PostMessage {
      text
    }
  }
`;

export default PostMessage;
