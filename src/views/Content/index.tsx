import * as React from 'react';
import gql from 'graphql-tag';

import ContactMessage, { ContactMessageFragment } from './ContactMessage';
import PostMessage, { PostMessageFragment } from './PostMessage';

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

export const ContentFragment = gql`
  fragment ContentFragment on MessageContent {
    ...ContactMessageFragment
    ...PostMessageFragment
    ... on EncryptedMessage {
      data
    }
  }
  ${ContactMessageFragment}
  ${PostMessageFragment}
`;

export default Content;
