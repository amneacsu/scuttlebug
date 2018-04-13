import * as React from 'react';
import gql from 'graphql-tag';
import Blob from '../Blob';

export interface Props {
  image?: string
};

const AboutMessage = ({
  image,
}: Props) => {
  if (image === null) {
    return null;
  }

  return <Blob id={image} />;
};

export const AboutMessageFragment = gql`
  fragment AboutMessageFragment on AboutMessage {
    ... on AboutMessage {
      image
    }
  }
`;

export default AboutMessage;
