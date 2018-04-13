import * as React from 'react';

export interface Props {
  id: string,
};

const Blob = ({ id, ...props }) => (
  <img src={`http://localhost:3040/blob/${id}`} {...props} />
);

export default Blob;
