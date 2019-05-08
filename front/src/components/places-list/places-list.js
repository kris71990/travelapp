import React from 'react';
import PropTypes from 'prop-types';

import './places-list.scss';

function PlaceList(props) {
  const { locations } = props;
  const countries = Object.keys(locations);

  function formatPlace(loc) {
    return `${loc.charAt(0).toUpperCase()}${loc.slice(1)}`;
  }

  return (
    <div className="place-list">
      { countries ?
        <ul>
          {
            countries.map((location, i) => {
              return <li key={i}>{ formatPlace(location) }</li>;
            })
          }
        </ul>
        : null
      }
    </div>
  );
}

PlaceList.propTypes = {
  locations: PropTypes.object,
};

export default PlaceList;
