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
      return [countryObj.name, countryObj.cities];
    });
  } else {
    countries = locations.sort((a, b) => {
      return Date.parse(b.updated) - Date.parse(a.updated);
    }).map((countryObj) => {
      if (!countryObj.name) return null;
      return [countryObj.name, countryObj.updated];
    });
  }


  function formatPlace(loc) {
    const countryFormat = `${loc[0].charAt(0).toUpperCase()}${loc[0].slice(1)}`;
    switch (sortType) {
      case 'cities':
        let cities = loc[1].map(city => city.charAt(0).toUpperCase() + city.slice(1));
        cities = cities.join(', ');
        return [`${countryFormat} (${loc[1].length})`, cities];
      default:
        const updatedAt = new Date(loc[1]).toString();
        return [countryFormat, updatedAt];
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
                  const data = formatPlace(location);
                  const wiki = `https://www.wikipedia.org/wiki/${location[0]}`;
                  return <li title={ data[1] } key={i}><a href={ wiki } rel="noopener noreferrer" target="_blank">{ data[0] }</a></li>;
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
