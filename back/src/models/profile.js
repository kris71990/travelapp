'use strict';

import mongoose from 'mongoose';

const countrySchema = mongoose.Schema({
  name: { 
    type: String,
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
}, { minimize: false, strict: true });

const profileSchema = mongoose.Schema({
  firstName: { 
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  hometown: {
    type: String,
    required: true,
  },
  locationsVisited: [countrySchema],
  locationsToVisit: [countrySchema],
  account: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true,
  },
}, { minimize: false, useNestedStrict: true });

const Profile = mongoose.model('profile', profileSchema);

export default Profile;
