import React from 'react';
import PropTypes from 'prop-types';

import './places-list.scss';

function PlaceList(props) {
  const { locations, sortType } = props;
  let countries;
  
  // if sort type is 'cities', order by most cities visited, else render by date updated (default)
  if (sortType === 'cities') {
    countries = locations.sort((a, b) => {
      return b.cities.length - a.cities.length;
    }).map((countryObj) => {
      if (!countryObj.name) return null;
      return [countryObj.name, countryObj.cities.length];
    });
  } else {
    countries = locations.sort((a, b) => {
      return Date.parse(b.updated) - Date.parse(a.updated);
    }).map((countryObj) => {
      if (!countryObj.name) return null;
      return countryObj.name;
    });
  }


  function formatPlace(loc) {
    switch (sortType) {
      case 'cities':
        return `${loc[0].charAt(0).toUpperCase()}${loc[0].slice(1)} (${loc[1]})`;
      default:
        return `${loc.charAt(0).toUpperCase()}${loc.slice(1)}`;
    }
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
  sortType: PropTypes.string,
};

export default PlaceList;
