import React from 'react';
import PropTypes from 'prop-types';
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

ContactMessage.propTypes = {
  contact: PropTypes.any,
};

export const ContactMessageFragment = gql`
  fragment ContactMessageFragment on ContactMessage {
    ... on ContactMessage {
      contact {
        id
      }
    }
  }
`;

export default ContactMessage;
