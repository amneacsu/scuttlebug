import * as React from 'react';
import gql from 'graphql-tag';

import AboutMessage, { AboutMessageFragment } from './AboutMessage';
import ContactMessage, { ContactMessageFragment } from './ContactMessage';
import PostMessage, { PostMessageFragment } from './PostMessage';

const typeMap = {
  about: AboutMessage,
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
    ...AboutMessageFragment
    ...ContactMessageFragment
    ...PostMessageFragment
    ... on EncryptedMessage {
      data
    }
  }
  ${AboutMessageFragment}
  ${ContactMessageFragment}
  ${PostMessageFragment}
`;

export default Content;
