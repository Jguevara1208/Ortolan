
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import navLogo from './NavbarLogo';
import './TopNav.css'

const TopNav = () => {

    const location = useLocation();
    const user = useSelector(state => state.session.user)

    const isSplashPage = (location.pathname === '/' && !user)
    const isLoginPage = location.pathname === '/login';
    const isSignUpPage = location.pathname === '/signup';

    const session = useSelector(state => state.session);

    if (isLoginPage || isSignUpPage || isSplashPage) {
        return null
    } else { 
        return (
            <nav className='top-nav'>
                {session.user 
                ? 
                <div className='signed-in'>
                    <div className='third-empty'/>
                    <div className='third-logo'>
                        {navLogo}
                    </div>
                    <div className='third-logout'>
                        <LogoutButton />
                    </div>
                </div>
                :
                <div>
                    {navLogo}
                    <NavLink to='/login' exact={true} activeClassName='active'>
                        Login
                    </NavLink>
                    <NavLink to='/signup' exact={true} activeClassName='active'>
                        Signup
                    </NavLink>
                </div>
                }

            </nav>
        );
    }
}

export default TopNav;
