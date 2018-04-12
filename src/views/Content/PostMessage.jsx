import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

const PostMessage = ({
  text,
}) => {
  return text;
};

PostMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

PostMessage.fragment = gql`
  fragment PostMessageFragment on PostMessage {
    ... on PostMessage {
      text
    }
  }
`;

export default PostMessage;
