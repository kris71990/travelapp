/* eslint-disable */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './place-map.scss';

function PlaceMap(props) {
  const { visited, toVisit } = props;

  useEffect(() => {
    google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: GOOGLE_API_KEY,
    });
    google.charts.setOnLoadCallback(drawMap);
  });

  function drawMap() {
    const countriesVisited = visited.map(country => [country.name, 1]);
    const countriesToVisit = toVisit.map(country => [country.name, 2]);
    const merged = [...countriesVisited, ...countriesToVisit];
    merged.unshift(['Country', 'Status']);
    const data = google.visualization.arrayToDataTable(merged);
    const options = {
      width: '100%',
      region: 'world',
      displayMode: 'regions',
      resolution: 'countries',
      backgroundColor: {
        fill: '#8EC9EB',
        stroke: '#f6b73c',
        strokeWidth: 15,
      },
      legend: 'none',
      datalessRegionColor: '#D2D3D3',
      colorAxis: {
        colors: [
          '#AD2626',
          '#4153D8',
        ],
      },
    };
    const container = document.getElementById('country-map');
    const chart = new google.visualization.GeoChart(container);
    chart.draw(data, options);
  }

  return (
    <div className="map-container">
      <div id="country-map"></div>
      <p id="visited">Red - visited</p>
      <p id="next">Blue - next to visit</p>
    </div>
  );
}

PlaceMap.propTypes = {
  visited: PropTypes.array,
  toVisit: PropTypes.array,
};

export default PlaceMap;
