import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { IoIosLogOut } from 'react-icons/io'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <IoIosLogOut className='logout' onClick={onLogout}/>;
};

export default LogoutButton;
