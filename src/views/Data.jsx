import React from 'react';
import PropTypes from 'prop-types';

const Data = ({
  children,
}) => {
  return (
    <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', background: '#f0f0f0', color: '#666', padding: 5 }}>
      {children}
    </div>
  );
};

Data.propTypes = {
  children: PropTypes.any,
};

export default Data;
