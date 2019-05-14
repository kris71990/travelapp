/* eslint-disable */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './city-map.scss';

import visitedIcon from '../../assets/star-3-red.png';
import toVisitIcon from '../../assets/star-3-blue.png';

function CityMap(props) {
  const { visited, toVisit } = props;

  useEffect(() => {
    google.charts.load('current', {
      packages: ['map'],
      mapsApiKey: GOOGLE_API_KEY,
    });
    google.charts.setOnLoadCallback(drawMap);
  });

  function drawMap() {
    const citiesVisited = [];
    const citiesToVisit = [];
    visited.forEach((country) => {
      country.cities.forEach((city) => {
        const format = city.charAt(0).toUpperCase() + city.slice(1);
        citiesVisited.push([city, format, 'blue']);
      });
    });
    toVisit.forEach((country) => {
      country.cities.forEach((city) => {
        const format = city.charAt(0).toUpperCase() + city.slice(1);
        citiesToVisit.push([city, format, 'green']);
      });
    });
    const merged = [...citiesVisited, ...citiesToVisit];

    const markerUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/24/'
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'City');
    data.addColumn('string', 'Location');
    data.addColumn('string', 'Marker');
    data.addRows(merged);
    const options = {
      mapType: 'terrain',
      showTooltip: true,
      showInfoWindow: true,
      useMapTypeControl: true,
      icons: {
        blue: {
          normal: toVisitIcon,
          selected: toVisitIcon,
        },
        green: {
          normal: visitedIcon,
          selected: visitedIcon,
        },
      },
    };
    const container = document.getElementById('city-map');
    const map = new google.visualization.Map(container);
    map.draw(data, options);
  }

  return (
    <div className="map-container">
      <div id="city-map"></div>
    </div>
  );
}

CityMap.propTypes = {
  visited: PropTypes.array,
  toVisit: PropTypes.array,
};

export default CityMap;
