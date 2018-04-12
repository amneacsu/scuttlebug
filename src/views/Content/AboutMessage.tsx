import * as React from 'react';
import gql from 'graphql-tag';

export interface Props {
  image?: string
};

const AboutMessage = ({
  image,
}: Props) => {
  if (image === null) {
    return null;
  }

  const url = `http://localhost:3040/blob/${image}`;

  return (
    <img src={url} />
  );
};

export const AboutMessageFragment = gql`
  fragment AboutMessageFragment on AboutMessage {
    ... on AboutMessage {
      image
    }
  }
`;

export default AboutMessage;
