import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import ContactMessage from './ContactMessage';
import PostMessage from './PostMessage';

const typeMap = {
  contact: ContactMessage,
  post: PostMessage,
};

const Content = ({
  type,
  data,
}) => {
  const MessageComponent = typeMap[type];

  if (!MessageComponent) {
    return null;
  }

  return <MessageComponent {...data} />;
};

Content.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object,
};

Content.fragment = gql`
  fragment ContentFragment on MessageContent {
    ...ContactMessageFragment
    ...PostMessageFragment
    ... on EncryptedMessage {
      data
    }
  }
  ${ContactMessage.fragment}
  ${PostMessage.fragment}
`;

export default Content;
