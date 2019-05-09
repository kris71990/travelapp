'use strict';

import mongoose from 'mongoose';

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
  locationsVisited: {
    type: Array,
    default: [],
  },
  locationsToVisit: {
    type: Array,
    default: [],
  },
  account: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true,
  },
}, { minimize: false });

const Profile = mongoose.model('profile', profileSchema);

export default Profile;
