import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './city-form.scss';

function CityForm(props) {
  const { profile, type, onComplete } = props;
  const [country, setCountry] = useState('');
  const [cities, setCities] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!country || !cities) return null;

    const formatPayload = { [country]: cities };
    
    switch (type) {
      case 'visited':
        return onComplete({ 
          _id: profile._id, locationsVisited: formatPayload, 
        })
          .then(() => {
            setCountry('');
            setCities('');
          });
      case 'toVisit':
        return onComplete({ 
          _id: profile._id, locationsToVisit: formatPayload, 
        })
          .then(() => {
            setCountry('');
            setCities('');
          });
      default:
        return null;
    }
  }

  function handleChange(e) {
    switch (e.target.name) {
      case 'cities':
        setCities(e.target.value);
        break;
      default:
        setCountry(e.target.value);
        setCities('');
    }
  }

  function formatPlace(loc) {
    return `${loc.charAt(0).toUpperCase()}${loc.slice(1)}`;
  }

  let selectJSX;
  if (profile) {
    if (type === 'visited') {
      const countries = profile.locationsVisited;
      selectJSX = countries.map((loc, i) => {
        const { name } = loc;
        if (!name) return null;
        return (
          <option name={name} value={name} key={i}>
            { formatPlace(name) }
          </option>
        );
      });
    } else {
      const countries = profile.locationsToVisit;
      selectJSX = countries.map((loc, i) => {
        const { name } = loc;
        if (!name) return null;
        return (
          <option name={name} value={name} key={i}>
            { formatPlace(name) }
          </option>
        );
      });
    }
  }

  return (
    <form className="city-form" onSubmit={ handleSubmit }>
      { type === 'visited' 
        ? <h5>Add locations you have visited:</h5>
        : <h5>Add locations you want to visit:</h5>
      }
      <select onChange={ handleChange } value={ country }>
        <option value="">Select</option>
        { selectJSX }
      </select>
      { country ?
          <div>
            <input
              name='cities'
              placeholder='cities'
              type='text'
              value={ cities }
              onChange={ handleChange }
            />
            <button type="submit">Add</button>
          </div>
        : null
      }
    </form>
  );
}

CityForm.propTypes = {
  profile: PropTypes.object,
  type: PropTypes.string,
  onComplete: PropTypes.func,
};

export default CityForm;
