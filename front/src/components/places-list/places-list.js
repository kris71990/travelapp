import React from 'react';
import PropTypes from 'prop-types';

import './places-list.scss';

function PlaceList(props) {
  const { locations } = props;
  const countries = locations.sort((a, b) => {
    return Date.parse(b.updated) - Date.parse(a.updated);
  }).map((countryObj) => {
    if (!countryObj.name) return null;
    return countryObj.name;
  });


  function formatPlace(loc) {
    return `${loc.charAt(0).toUpperCase()}${loc.slice(1)}`;
  }

  return (
    <div>
      {
        countries.length > 0 ?
          <div className="place-list">
            <ul>
              {
                countries.map((location, i) => {
                  if (!location) return null;
                  return <li key={i}>{ formatPlace(location) }</li>;
                })
              }
            </ul>
          </div>
          : null
      }
    </div>
  );
}

PlaceList.propTypes = {
  locations: PropTypes.array,
};

export default PlaceList;
