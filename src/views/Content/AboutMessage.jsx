import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Blob from '../Blob';

const AboutMessage = ({
  image,
}) => {
  if (image === null) {
    return null;
  }

  return <Blob id={image} />;
};

AboutMessage.propTypes = {
  image: PropTypes.string,
};

export const AboutMessageFragment = gql`
  fragment AboutMessageFragment on AboutMessage {
    ... on AboutMessage {
      image
    }
  }
`;

export default AboutMessage;
