import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaHome} from 'react-icons/fa'
import { BsFillFileEarmarkTextFill } from 'react-icons/bs'
import {VscChecklist} from 'react-icons/vsc'
import { RiSettings5Fill } from 'react-icons/ri'
import './NavBar.css'

const SideNav = () => {
  
  const userName = useSelector(state => state.session.user.name)

  return (
    <nav className='side-nav'>
      <div className='user-name'>
        <p>{userName}</p>
      </div>
      <NavLink to='/' exact={true} activeClassName='active'>
        <div className='side-nav-links'>
          <div className='nav-icon-container'>
            <FaHome/>
          </div>
          <p>Dashboard</p> 
        </div>
      </NavLink>
      <NavLink to='/recipes' exact={true} activeClassName='active'>
        <div className='side-nav-links'>
          <div className='nav-icon-container'>
            <BsFillFileEarmarkTextFill/>
          </div>
          <p>Recipes</p>
        </div>
      </NavLink>
      <NavLink to='/projects' exact={true} activeClassName='active'>
        <div className='side-nav-links'>
          <div className='nav-icon-container'>
            <VscChecklist/>
          </div>
          <p>Projects</p>
        </div>
      </NavLink>
      <NavLink to='/settings' exact={true} activeClassName='active'>
        <div className='side-nav-links'>
          <div className='nav-icon-container'>
            <RiSettings5Fill/>
          </div>
          <p>Settings</p>
        </div>
      </NavLink>
    </nav>
  );
}

export default SideNav;
