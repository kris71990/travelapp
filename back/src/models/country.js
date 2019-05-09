'use strict';

import mongoose from 'mongoose';

const countrySchema = mongoose.Schema({
  name: { 
    type: Date,
    required: true,
  },
  cities: {
    type: Array,
    default: [],
  },
  created: {
    type: Date,
    required: true,
  },
  updated: {
    type: Date,
    required: true,
  },
}, { minimize: false });

const Country = mongoose.model('country', countrySchema);

export default Country;
