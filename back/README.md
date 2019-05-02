# Travel Aid - Backend

<!-- [![Travis branch](https://img.shields.io/travis/kris71990/the_world_right_now/master.svg)](https://travis-ci.org/kris71990/the_world_right_now)
![Coverage](https://img.shields.io/badge/coverage-98%25-brightgreen.svg)
[![David](https://img.shields.io/david/expressjs/express.svg)]( https://github.com/kris71990/the_world_right_now)
![version](https://img.shields.io/badge/version-2.0.0-orange.svg)
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/kris71990/the_world_right_now) -->

**Author: Kris Sakarias**

**Version: 1.0.0**

## Overview

A server built with *Node*, *Express*, managing data storage with *MongoDB* and **Mongoose**. This application simply allows a user to keep track of the travel destinations they've visited and want to visit. 

## Documentation

**Database Models**
Only two models are used - `Account` and `Profile`. All location data is kept on the user profile.

**Routing**


### Testing

Unit testing is done with `Mocha` and `Chai`. 96% of server code is covered.

Run tests with `npm run test`.