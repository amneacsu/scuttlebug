import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Data from '../Data';

const UnhandledMessage = ({
  data,
}) => {
  return (
    <Data>{data}</Data>
  );
};

UnhandledMessage.propTypes = {
  data: PropTypes.any,
};

export const UnhandledMessageFragment = gql`
  fragment UnhandledMessageFragment on UnhandledMessage {
    ... on UnhandledMessage {
      data
    }
  }
`;

export default UnhandledMessage;
