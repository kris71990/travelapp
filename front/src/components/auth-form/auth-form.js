import React, { useState, useEffect } from 'react';

function AuthForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => console.log('woot'));

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    switch (e.target.name) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        return undefined;
    }
    return undefined;
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <input
        name='username'
        placeholder='username'
        type='text'
        value={username}
        onChange={handleChange}
      />
      <input
        name='password'
        placeholder='password'
        type='password'
        value={password}
        onChange={handleChange}
      />
      <button type="submit">Signup</button>
    </form>
  );
}

export default AuthForm;
