import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './profile-form.scss';

function ProfileForm(props) {
  const { onComplete, profile } = props;
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [hometown, setHometown] = useState('');

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setAge(profile.age);
      setHometown(profile.hometown);
    }
    return () => undefined;
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    
    return onComplete({ 
      firstName, age, hometown, _id: profile._id, 
    });
  }

  function handleChange(e) {
    switch (e.target.name) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'age':
        setAge(e.target.value);
        break;
      case 'hometown':
        setHometown(e.target.value);
        break;
      default:
        return undefined;
    }
    return undefined;
  }

  return (
    <form className='profile-form' onSubmit={ handleSubmit }>
      <input
        name='firstName'
        placeholder='first name'
        type='text'
        value={firstName}
        onChange={handleChange}
      />
      <input
        name='age'
        placeholder='age'
        type='text'
        value={age}
        onChange={handleChange}
      />
      <input
        name='hometown'
        placeholder='hometown'
        type='text'
        value={hometown}
        onChange={handleChange}
      />
      <button type="submit">{ profile ? 'Edit' : 'Create'}</button>
    </form>
  );
}

ProfileForm.propTypes = {
  onComplete: PropTypes.func,
  profile: PropTypes.object,
};

export default ProfileForm;
