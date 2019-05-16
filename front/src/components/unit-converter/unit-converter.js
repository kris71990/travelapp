import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './unit-converter.scss';

function UnitConverter(props) {
  const { type } = props;
  const [unitTemp, setUnitTemp] = useState('C');
  const [unitLen, setUnitLen] = useState('m');
  const [tempVal, setTempVal] = useState(0);
  const [lenVal, setLenVal] = useState(0);
  const [convertedTemp, setConvertedTemp] = useState(0);
  const [convertedLen, setConvertedLen] = useState(0);

  function handleChange(e) {
    if (type === 'temp') {
      setTempVal(e.target.value);
      setConvertedTemp(0);
    } else {
      setLenVal(e.target.value);
      setConvertedLen(0);
    }
  }

  function toggleUnit() {
    setConvertedTemp(0);
    if (unitTemp === 'C') {
      setUnitTemp('F');
    } else {
      setUnitTemp('C');
    }
  }

  function cycleUnit() {
    setConvertedLen(0);
    if (unitLen === 'ft') {
      setUnitLen('m');
    } else {
      setUnitLen('ft');
    }
  }

  function handleSubmitTemp(e) {
    e.preventDefault();

    if (unitTemp === 'C') {
      setConvertedTemp(Math.round(((tempVal * (9 / 5)) + 32) * 100) / 100);
    } else {
      setConvertedTemp(Math.round(((tempVal - 32) * (5 / 9)) * 100) / 100);
    }
  }

  function handleSubmitLen(e) {
    e.preventDefault();

    if (unitLen === 'ft') {
      setConvertedLen(Math.round((lenVal / 3.281) * 100) / 100);
    } else {
      setConvertedLen(Math.round((lenVal * 3.281) * 100) / 100);
    }
  }

  let convertFormJSX;
  if (type === 'temp') {
    convertFormJSX = 
      <form onSubmit={ handleSubmitTemp }>
        <label>Temperature in { unitTemp }:</label>
        <input
          name='temp'
          placeholder={ unitTemp }
          type='number'
          value={ tempVal }
          onChange={ handleChange }
        />
        <p onClick={ toggleUnit }>Toggle Unit</p>
        <div>
          <button type="submit">Convert</button>
        </div>
      </form>;
  } else {
    convertFormJSX = 
      <form onSubmit={ handleSubmitLen }>
        <label>Length in { unitLen }:</label>
        <input
          name='length'
          placeholder={ unitLen }
          type='number'
          value={ lenVal }
          onChange={ handleChange }
        />
        <p onClick={ cycleUnit }>Toggle Unit</p>
        <div>
          <button type="submit">Convert</button>
        </div>
      </form>;
  }

  let convertedValJSX;
  if (type === 'temp') {
    if (unitTemp === 'C') {
      convertedValJSX = <p>{ tempVal } C = { convertedTemp } F</p>;
    } else {
      convertedValJSX = <p>{ tempVal } F = { convertedTemp } C</p>;
    }
  } else if (unitLen === 'm') {
    convertedValJSX = <p>{ lenVal } m = { convertedLen } ft</p>;
  } else {
    convertedValJSX = <p>{ lenVal } ft = { convertedLen } m</p>;
  }

  return (
    <div className="unit-container">
      { convertFormJSX }
      { convertedTemp ? convertedValJSX : null }
      { convertedLen ? convertedValJSX : null }
    </div>
  );
}

UnitConverter.propTypes = {
  type: PropTypes.string,
};

export default UnitConverter;
