import * as React from 'react';
import gql from 'graphql-tag';

import AboutMessage, { AboutMessageFragment } from './AboutMessage';
import ContactMessage, { ContactMessageFragment } from './ContactMessage';
import PostMessage, { PostMessageFragment } from './PostMessage';
import UnhandledMessage, { UnhandledMessageFragment } from './UnhandledMessage';

const typeMap = {
  AboutMessage: AboutMessage,
  ContactMessage: ContactMessage,
  PostMessage: PostMessage,
  UnhandledMessage: UnhandledMessage,
};

const Content = ({
  type,
  data,
}) => {
  const MessageComponent = typeMap[data.__typename];

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
    ...UnhandledMessageFragment
    ... on EncryptedMessage {
      data
    }
  }
  ${AboutMessageFragment}
  ${ContactMessageFragment}
  ${PostMessageFragment}
  ${UnhandledMessageFragment}
`;

export default Content;
