
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import navLogo from './NavbarLogo';

const TopNav = () => {

    const location = useLocation();

    const isLoginPage = location.pathname === '/login';
    const isSignUpPage = location.pathname === '/signup';

    const session = useSelector(state => state.session);

    if (isLoginPage || isSignUpPage) {
        return null
    } else { 
        return (
            <nav>
                {session.user 
                ? 
                <div>
                    <div>
                        {navLogo}
                    </div>
                    <div>
                        <LogoutButton />
                    </div>
                </div>
                :
                <div>
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
