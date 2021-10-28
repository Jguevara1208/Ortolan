import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    };
  };

  const demoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('jordansacct@gmail.com', 'password'));
    if (data) {
      setErrors(data)
    };
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='auth-form'onSubmit={onLogin}>
      <h3>Welcome Back</h3>
      {errors.length > 0 && errors.map((err, i) => (
        <>
          {err.startsWith('email') && (
            <p key={`email-${i}`} className='error'>• {err.split(':')[1].trim()}</p>
          )}
        </>
      ))}
      <div className='ol-input'>
        <input
          name='email'
          type='text'
          placeholder=' '
          value={email}
          onChange={updateEmail}
        />
        <label htmlFor="email">Email</label>
      </div>
      {errors.length > 0 && errors.map((err, i) => (
        <>
          {err.startsWith('password') && (
            <p key={`password-${i}`} className='error'>• {err.split(':')[1].trim()}</p>
          )}
        </>
      ))}
      <div className='ol-input'>
        <input
          name='password'
          type='password'
          placeholder=' '
          value={password}
          onChange={updatePassword}
        />
        <label htmlFor='password'>Password</label>
      </div>
        <button className='form-button' type='submit'>Login</button>
        <button className='form-demo' onClick={demoUser}>Demo</button>
        <p>No account? <Link className='log-in-link' to='/signup'>Sign Up</Link></p>
    </form>
  );
};

export default LoginForm;
