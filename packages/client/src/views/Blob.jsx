import React from 'react';
import PropTypes from 'prop-types';

const Blob = ({ id, ...props }) => (
  <img src={`http://localhost:3040/blob/${id}`} {...props} />
);

Blob.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Blob;
