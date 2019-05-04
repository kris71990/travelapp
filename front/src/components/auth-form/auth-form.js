import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './auth-form.scss';

function AuthForm(props) {
  const { onComplete, type } = props;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (type === 'login') {
      return onComplete({ username, password })
        .then(() => {
          return () => {
            setUsername('');
            setPassword('');
          };
        });
    }
    
    return onComplete({ username, email, password })
      .then(() => {
        return () => {
          setUsername('');
          setEmail('');
          setPassword('');
        };
      });
  }

  function handleChange(e) {
    switch (e.target.name) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      default:
        return undefined;
    }
    return undefined;
  }

  return (
    <form className='auth-form' onSubmit={ handleSubmit }>
      <input
        name='username'
        placeholder='username'
        type='text'
        value={username}
        onChange={handleChange}
      />
      {
        type === 'signup' ? 
          <input
            name='email'
            placeholder='email'
            type='email'
            value={email}
            onChange={handleChange}
          />
          : null
      }
      <input
        name='password'
        placeholder='password'
        type='password'
        value={password}
        onChange={handleChange}
      />
      <button type="submit">{ type === 'login' ? 'Login' : 'Signup' }</button>
    </form>
  );
}

AuthForm.propTypes = {
  onComplete: PropTypes.func,
  type: PropTypes.string,
};

export default AuthForm;
