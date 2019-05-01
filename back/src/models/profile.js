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
    type: Object,
    default: {},
  },
  locationsToVisit: {
    type: Object,
    default: {},
  },
  account: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true,
  },
}, { minimize: false });

const Profile = mongoose.model('profile', profileSchema);

export default Profile;
