import * as React from 'react';

export interface Props {
  children: string,
};

const Data = ({
  children,
}: Props) => {
  return (
    <div style={{ whiteSpace: 'pre', fontFamily: 'monospace', background: '#f0f0f0', color: '#666', padding: 5 }}>
      {children}
    </div>
  );
};

export default Data;
