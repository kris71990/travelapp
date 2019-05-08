import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './place-form.scss';

function CountryForm(props) {
  const { profile, type, onComplete } = props;
  const [country, setCountry] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    
    switch (type) {
      case 'visited':
        return onComplete({ 
          _id: profile._id, locationsVisited: country, 
        })
          .then(() => setCountry(''));
      case 'toVisit':
        return onComplete({ 
          _id: profile._id, locationsToVisit: country, 
        })
          .then(() => setCountry(''));
      default:
        return null;
    }
  }

  function handleChange(e) {
    setCountry(e.target.value);
  }

  return (
    <div>
      { type === 'visited' 
        ? <h5>Add a country you have visited:</h5>
        : <h5>Add a country you want to visit:</h5>
      }
      <form className='country-form' onSubmit={ handleSubmit }>
        <input
          name='country'
          placeholder='country'
          type='text'
          value={ country }
          onChange={ handleChange }
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

CountryForm.propTypes = {
  profile: PropTypes.object,
  type: PropTypes.string,
  onComplete: PropTypes.func,
};

export default CountryForm;
