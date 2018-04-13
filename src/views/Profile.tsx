import * as React from 'react';
import gql from 'graphql-tag';
import Blob from './Blob';

export interface Props {
  name?: string,
  description?: string,
  image?: string,
};

const Profile = ({
  name,
  description,
  image,
}: Props) => {
  return (
    <div style={{ padding: 20 }}>
      {name && <div>Name: {name}</div>}
      {description && <div>Description: {description}</div>}
      {image && <Blob id={image} width={64} height={64} />}
    </div>
  );
};

export const ProfileFragment = gql`
  fragment ProfileFragment on Profile {
    name
    description
    image
  }
`;

export default Profile;
