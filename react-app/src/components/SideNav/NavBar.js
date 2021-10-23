import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideNav = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav>
      <p>{user.name}</p>
      <NavLink to='/' exact={true} activeClassName='active'>
        Dashboard
      </NavLink>
      <NavLink to='/recipes' exact={true} activeClassName='active'>
        Recipes
      </NavLink>
      <NavLink to='/projects' exact={true} activeClassName='active'>
        Projects
      </NavLink>
      <NavLink to='/settings' exact={true} activeClassName='active'>
        Settings
      </NavLink>
    </nav>
  );
}

export default SideNav;
