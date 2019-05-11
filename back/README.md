# TripTracker - Backend

<img src="../front/src/assets/flag-banner.png">

![Travis (.com) branch](https://img.shields.io/travis/com/kris71990/travelapp/master.svg?style=popout)
![Coverage](https://img.shields.io/badge/coverage-96%25-bright%20green.svg)
[![David](https://img.shields.io/david/expressjs/express.svg)]( https://github.com/kris71990/travelapp)
![version](https://img.shields.io/badge/version-2.0.0-blue.svg)
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/kris71990/travelapp)

---

**Author: Kris Sakarias**

**Version: 2.0.0**

---

## Overview

Track your travels with TripTracker. Create an account and add countries, cities, and other locations that you have visited or are planning on visiting. Plot them on a map to see a visual representation of your journey.

The server is built with **Node**, **Express**, and manages data storage with **MongoDB** and **Mongoose**.

## Documentation

### Database Models

Two models are used - `Account` and `Profile`. All location data is kept on the user profile. A sub document model ensures common structure of the location data on the profile.

`Account` and `Profile` have a one-to-one (1:1) relationship.


### Routing

Account Router

1. POST /signup
  - A successful post request to /signup creates a user account.
  - Required fields:
    - `username`
    - `password`
    - `email`
  - User is authenticated with a token and logged in*

2. GET /login
  - A successful get request to /login will verify the user and send an authentication token*
  - Required fields: 
    - `username`
    - `password`


Profile Router

1. POST /profile
  - A successful post request will create and return a profile
  - Required fields:
    - `name`
    - `age`
    - `hometown`
  - The profile is also initialized with an empty `locationsVisited` and `locationsToVisit` array to accomodate location data.

2. GET /profile/me
  - If user is logged in and their profile exists, their profile will be returned.

3. PUT /profile/:id
  - A profile update is triggered during an update of simple profile data (name, age, hometown), or whenever the user adds location data.
  - If adding a new country to either the `locationsVisited` or `locationsToVisit` array, the request must include a string of the country to be added.
    - The profile is updated by creating a new country object and pushing it to the appropriate array. This object includes the following data:
      - `name` - name of the country (string)
      - `cities` - cities or locations in the country (array of strings) 
      - `created` timestamp that never changes
      - `updated` timestamp that changes whenever the data is changed
  - If adding cities to a country that already exists (it is not possible to add cities before a country exists) in either the `locationsVisited` or `locationsToVisit` arrays, the request must include a simple object as follows:
  ```javascript
    // { 'country': 'string of comma seperated cities' }
    { 'china': 'beijing, shanghai, nanjing' }
  ```
  - The appropriate country object is updated by pushing the cities to the cities array, if they don't already exist.
  - The updated profile is then returned to the user 

---
`*` A note on privacy

> A user's password is never stored in plain text. Upon receipt, it is hashed and immediately deleted. The hash is stored and compared to a hash of subsequent login attempt passwords to authenticate a user.

> User authentication is handled with [JSON Web Token](https://jwt.io). On a successful login, a token is created by signing against the account's unique token seed. This ensures private user interaction with the application. 

---
### Testing
---

Unit testing is done with `Mocha` and `Chai`. 96% of server code is covered.

Run tests with `npm run test`.