import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Blob from './Blob';

const Profile = ({
  name,
  description,
  image,
}) => {
  return (
    <div style={{ padding: 20 }}>
      {name && <div>Name: {name}</div>}
      {description && <div>Description: {description}</div>}
      {image && <Blob id={image} width={64} height={64} />}
    </div>
  );
};

Profile.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export const ProfileFragment = gql`
  fragment ProfileFragment on Profile {
    name
    description
    image
  }
`;

export default Profile;
