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
  contact: PropTypes.object.isRequired,
};

ContactMessage.fragment = gql`
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
