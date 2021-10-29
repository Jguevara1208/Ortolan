import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  
  const fileUpload = useRef(null);
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [admin] = useState(true)
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
    if (firstName.length > 50) err.push('firstName:First Name must be less than 50 characters')
    if (lastName === '') err.push('lastName:Last Name is required')
    if (lastName.length > 50) err.push('lastName:Last Name must be less than 50 characters')
    if (restaurant === '') err.push('restaurant:Restaurant is required')
    if (restaurant.length > 50) err.push('restaurant:Restaurant must be less than 50 characters')
    if (position === '') err.push('position:Position is required')
    if (position.length > 50) err.push('position:Position must be less than 50 characters')
    if (password !== repeatPassword) err.push('repeatPassword:Passwords do not match')
    if (email === '') err.push('email:Email is required')
    if (email.length > 255) err.push('email:Email must be less than 255 characters')
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
      await dispatch(signUp(
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
      {errors.length > 0 && errors.map((err, i) => (
        <>
          {err.startsWith('firstName') && (
            <p key={`firstName-${i}`} className='error'>• {err.split(':')[1]}</p>
          )}
        </>
      ))}
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
      {errors.length > 0 && errors.map((err, i) => (
        <>
          {err.startsWith('lastName') && (
            <p key={`lastName-${i}`} className='error'>• {err.split(':')[1]}</p>
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
      {errors.length > 0 && errors.map((err, i) => (
        <>
          {err.startsWith('email') && (
            <p key={`email-${i}`} className='error'>• {err.split(':')[1]}</p>
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
      <div className='photo-container su-photo-container'>
        {image
          ?
          <>
            <input type='file' className='inputfile' ref={fileUpload} onChange={handlePhoto} />
            <div className='su-photo' onClick={() => handleUpload()} style={{ backgroundImage: `url('${image}')`, cursor: 'pointer'}} />
          </>
          :
          <>
            <input type='file' className='inputfile' ref={fileUpload} onChange={handlePhoto} />
            <div className='fileChooser su-fileChooser' onClick={() => handleUpload()} >Avatar Photo</div>
          </>
        }
      </div>
      {errors.length > 0 && errors.map((err, i) => (
        <>
          {err.startsWith('restaurant') && (
            <p key={`restaurant-${i}`} className='error'>• {err.split(':')[1]}</p>
          )}
        </>
      ))}
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
      {errors.length > 0 && errors.map((err, i) => (
        <>
          {err.startsWith('position') && (
            <p key={`position-${i}`} className='error'>• {err.split(':')[1]}</p>
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
      {errors.length > 0 && errors.map((err, i) => (
        <>
          {err.startsWith('password') && (
            <p key={`password-${i}`} className='error'>• {err.split(':')[1]}</p>
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
      {errors.length > 0 && errors.map((err, i) => (
        <>
          {err.startsWith('repeatPassword') && (
            <p key={`repeatPassword-${i}`} className='error'>• {err.split(':')[1]}</p>
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
      <button className='form-button' type='submit'>Sign Up</button>
      <p>Already have an account? <Link className='log-in-link link' to='/login'>Log In</Link></p>
    </form>
  );
};

export default SignUpForm;
