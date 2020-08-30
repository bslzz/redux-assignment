import React from 'react';
import { NavLink } from 'react-router-dom';

const NonRegisteredUsers = () => (
  <div>
    <li>
      <NavLink to="/login">Login</NavLink>
    </li>
    <li>
      <NavLink to="/register">Register</NavLink>
    </li>
  </div>
);

export default NonRegisteredUsers;
