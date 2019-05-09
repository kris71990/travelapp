import React from 'react';
import PropTypes from 'prop-types';

import './places-list.scss';

function PlaceList(props) {
  const { locations } = props;
  const countries = locations.map((countryObj) => {
    return countryObj.country;
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
