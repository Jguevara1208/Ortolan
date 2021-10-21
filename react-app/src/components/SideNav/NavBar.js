
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const SideNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to='/recipes' exact={true} activeClassName='active'>
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink to='/projects' exact={true} activeClassName='active'>
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to='/settings' exact={true} activeClassName='active'>
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/signup' exact={true} activeClassName='active'>
            Signup
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNav;
