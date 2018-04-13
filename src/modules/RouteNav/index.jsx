import React from 'react';
import { Link } from 'react-router-dom';
import css from './index.css';

const RouteNav = () => {
  return (
    <ul className={css.RouteNav}>
      <li><Link to="/">Home</Link></li>
    </ul>
  );
};

export default RouteNav;
