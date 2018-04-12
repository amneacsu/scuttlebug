import * as React from 'react';
import gql from 'graphql-tag';

export interface Props {
  data: string
};

const UnhandledMessage = ({
  data,
}: Props) => {
  return (
    <div style={{ whiteSpace: 'pre', fontFamily: 'monospace', border: '#888 1px solid', padding: 10 }}>{data}</div>
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
