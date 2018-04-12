import React from 'react';
import { Link } from 'react-router-dom';

const Content = ({
  type,
  data,
}) => {
  switch (type) {
    case 'contact':
      return (
        <Link to={`/feed/${data.contact.id}`}>
          {data.contact.id}
        </Link>
      );

    case 'post':
      return data.text;

    case 'blob':
      console.log(data);
      return data.data;

    default:
      return <div>unk</div>;
  }
};

export default Content;
