import * as React from 'react';
import gql from 'graphql-tag';

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
      {image && <img width={64} height={64} src={`http://localhost:3040/blob/${image}`} />}
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
