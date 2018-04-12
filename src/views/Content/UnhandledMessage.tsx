import * as React from 'react';
import gql from 'graphql-tag';
import Data from '../Data';

export interface Props {
  data: string
};

const UnhandledMessage = ({
  data,
}: Props) => {
  return (
    <Data>{data}</Data>
  );
};

export const UnhandledMessageFragment = gql`
  fragment UnhandledMessageFragment on UnhandledMessage {
    ... on UnhandledMessage {
      data
    }
  }
`;

export default UnhandledMessage;
