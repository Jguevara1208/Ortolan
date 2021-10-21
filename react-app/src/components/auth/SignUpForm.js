import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {

  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [admin, setAdmin] = useState(false)
  const [restaurant, setRestaurant] = useState('')
  const [position, setPosition] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [imageLoading, setImageLoading] = useState(false)
  const [image, setImage] = useState(false)

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
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
      if (data) {
        setErrors(data)
      }
    }
  };

  const handlePhoto = async (e) => {
    const formData = new FormData()
    formData.append("image", e.target.files[0])
    setImageLoading(true)

    const res = await fetch('/api/images/', {
      method: "POST",
      body: formData
    });
    if (res.ok) {
      const imgUrl = await res.json()
      setImage(imgUrl.url)
      setImageLoading(false)
    } else {
      setImageLoading(false)
      setErrors([...errors, 'Cannot upload file'])
    }
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='lastName'
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      {image 
        ? 
          <img src={image} alt="" />
        :
          <div>
            <input 
              type="file" 
              accept='image/*'
              onChange={handlePhoto}
            />
          { imageLoading && <p>Loading...</p> }
          </div>
      }
      <div>
        <label>Admin</label>
        <input
          type='checkbox'
          name='admin'
          onChange={() => setAdmin(!admin)}
          value={admin}
        ></input>
      </div>
      <div>
        <label>Restaurant</label>
        <input
          type='text'
          name='restaurant'
          onChange={(e) => setRestaurant(e.target.value)}
          value={restaurant}
        ></input>
      </div>
      <div>
        <label>Position</label>
        <input
          type='text'
          name='position'
          onChange={(e) => setPosition(e.target.value)}
          value={position}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
