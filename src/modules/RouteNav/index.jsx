import React from 'react';
import { Link } from 'react-router-dom';
import css from './index.css';

const RouteNav = () => {
  return (
    <ul className={css.RouteNav}>
      <li><Link to="/">go to /</Link></li>
      <li><Link to="/feed/1">go to /feed/1</Link></li>
    </ul>
  );
};

export default RouteNav;
