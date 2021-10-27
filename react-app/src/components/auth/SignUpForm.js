import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  
  const fileUpload = useRef(null);
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [admin, setAdmin] = useState(true)
  const [restaurant, setRestaurant] = useState('')
  const [position, setPosition] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [image, setImage] = useState(false)

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const checkErrors = () => {
    let err = []
    if (firstName === '') err.push('firstName:First Name is required')
    if (lastName === '') err.push('lastName:Last Name is required')
    if (restaurant === '') err.push('restaurant:Restaurant is required')
    if (position === '') err.push('position:Position is required')
    if (password !== repeatPassword) err.push('repeatPassword:Passwords do not match')
    if (email === '') err.push('email:Email is required')
    if (email) {
      if (email.split('@').length !== 2 && email.split('.').length !== 2){ 
        err.push('email:Must be valid email address')
      }
    }
    return err
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    const res = checkErrors()
    if (res.length > 0) {
      setErrors(res)
      return
    } else {
      const data = await dispatch(signUp(
        {
          firstName, 
          lastName, 
          avatar: image, 
          admin, 
          restaurant, 
          position, 
          email, 
          password
        }
        ));
    }
  };

  const handlePhoto = async (e) => {
    const formData = new FormData()
    formData.append("image", e.target.files[0])

    const res = await fetch('/api/images/', {
      method: "POST",
      body: formData
    });
    if (res.ok) {
      const imgUrl = await res.json()
      setImage(imgUrl.url)
    } else {
      setErrors([...errors, 'Cannot upload file'])
    }
  }

  const handleUpload = () => {
    fileUpload.current.click()
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='auth-form' onSubmit={onSignUp} autoComplete='off'>
      <h3>Welcome</h3>
      <div className='ol-input'>
        <input
          placeholder=' '
          type='text'
          name='firstName'
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        ></input>
        <label htmlFor="firstName">First Name</label>
      </div>
      {errors.length > 0 && errors.map(err => (
        <>
          {err.startsWith('firstName') && (
            <p className='error'>• {err.split(':')[1]}</p>
          )}
        </>
      ))}
      <div className='ol-input'>
        <input
          placeholder=' '
          type='text'
          name='lastName'
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        ></input>
        <label htmlFor="lastName">Last Name</label>
      </div>
      {errors.length > 0 && errors.map(err => (
        <>
          {err.startsWith('lastName') && (
            <p className='error'>• {err.split(':')[1]}</p>
          )}
        </>
      ))}
      <div className='ol-input'>
        <input
          placeholder=' '
          type='text'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <label htmlFor="email">Email</label>
      </div>
      {errors.length > 0 && errors.map(err => (
        <>
          {err.startsWith('email') && (
            <p className='error'>• {err.split(':')[1]}</p>
          )}
        </>
      ))}
      <div className='photo-container su-photo-container'>
        {image
          ?
          <div className='su-photo' style={{ backgroundImage: `url('${image}')` }} />
          :
          <>
            <input type='file' className='inputfile' ref={fileUpload} onChange={handlePhoto} />
            <div className='fileChooser su-fileChooser' onClick={() => handleUpload()} >Avatar Photo</div>
          </>
        }
      </div>
      <div className='ol-input'>
        <input
          placeholder=' '
          type='text'
          name='restaurant'
          onChange={(e) => setRestaurant(e.target.value)}
          value={restaurant}
        ></input>
        <label htmlFor="restaurant">Restaurant</label>
      </div>
      {errors.length > 0 && errors.map(err => (
        <>
          {err.startsWith('restaurant') && (
            <p className='error'>• {err.split(':')[1]}</p>
          )}
        </>
      ))}
      <div className='ol-input'>
        <input
          placeholder=' '
          type='text'
          name='position'
          onChange={(e) => setPosition(e.target.value)}
          value={position}
        ></input>
        <label htmlFor="position">Position</label>
      </div>
      {errors.length > 0 && errors.map(err => (
        <>
          {err.startsWith('position') && (
            <p className='error'>• {err.split(':')[1]}</p>
          )}
        </>
      ))}
      <div className='ol-input'>
        <input
          placeholder=' '
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <label htmlFor="password">Password</label>
      </div>
      {errors.length > 0 && errors.map(err => (
        <>
          {err.startsWith('password') && (
            <p className='error'>• {err.split(':')[1]}</p>
          )}
        </>
      ))}
      <div className='ol-input'>
        <input
          placeholder=' '
          type='password'
          name='repeat_password'
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>
        <label htmlFor="repeat_password">Repeat Password</label>
      </div>
      {errors.length > 0 && errors.map(err => (
        <>
          {err.startsWith('repeatPassword') && (
            <p className='error'>• {err.split(':')[1]}</p>
          )}
        </>
      ))}
      <button className='form-button' type='submit'>Sign Up</button>
      <p>Already have an account? <Link className='log-in-link' to='/login'>Log In</Link></p>
    </form>
  );
};

export default SignUpForm;
