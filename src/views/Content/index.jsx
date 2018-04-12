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

    default:
      return null;
  }
};

export default Content;
