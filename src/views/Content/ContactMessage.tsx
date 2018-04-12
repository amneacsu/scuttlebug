import * as React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

const ContactMessage = ({
  contact,
}) => {
  return (
    <Link to={`/feed/${contact.id}`}>
      {contact.id}
    </Link>
  );
};

export const ContactMessageFragment = gql`
  fragment ContactMessageFragment on ContactMessage {
    ... on ContactMessage {
      contact {
        id
        name
        description
      }
    }
  }
`;

export default ContactMessage;
