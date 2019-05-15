import React, { useState } from 'react';

import './unit-converter.scss';

function UnitConverter() {
  const [tempUnit, setTempUnit] = useState('C');
  const [tempVal, setTempVal] = useState(0);
  const [convertedVal, setConvertedVal] = useState(0);

  function handleChange(e) {
    setTempVal(e.target.value);
    setConvertedVal(0);
  }

  function toggleUnit() {
    if (tempUnit === 'C') {
      setTempUnit('F');
      setConvertedVal(0);
    } else {
      setTempUnit('C');
      setConvertedVal(0);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (tempUnit === 'C') {
      setConvertedVal(Math.round(((tempVal * (9 / 5)) + 32) * 100) / 100);
    } else {
      setConvertedVal(Math.round(((tempVal - 32) * (5 / 9)) * 100) / 100);
    }
  }

  let convertedValJSX;
  if (tempUnit === 'C') {
    convertedValJSX = 
      <p>{ tempVal } C = { convertedVal } F</p>;
  } else {
    convertedValJSX = 
      <p>{ tempVal } F = { convertedVal } C</p>;
  }

  return (
    <div className="unit-container">
      <form onSubmit={ handleSubmit }>
        <label>Temperature in { tempUnit }:</label>
        <input
          name='temp'
          placeholder={ tempUnit }
          type='number'
          value={ tempVal }
          onChange={ handleChange }
        />
        <p onClick={ toggleUnit }>Toggle Unit</p>
        <div>
          <button type="submit">Convert</button>
        </div>
      </form>
      { convertedVal ?
        convertedValJSX
        : <div></div>
      }
    </div>
  );
}

export default UnitConverter;
