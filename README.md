# TripTracker

<img src="front/src/assets/flag-banner.png">

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

The user will interact with a frontend built with **React** and **Redux**, transpiled from modern Javascript (**ES6**) with **Babel**, and bundled with **Webpack**. 

The server is built with **Node**, **Express**, and manages data storage with **MongoDB** and **Mongoose**.

See subdirectory READMEs for further documentation.

---
## A Quick Look

<img src="front/src/assets/trip-tracker3.jpeg" width="700px">

Visualize your past and future travels.

<img src="front/src/assets/trip-tracker2.jpeg" width="500px">

Add and pin cities or locations you have visited.

<img src="front/src/assets/trip-tracker1.jpeg" width="500px">



---
### Testing
---

Server unit testing is done with `Mocha` and `Chai`. 96% of server code is covered.

Run tests with `cd back && npm run test`.

Front-end testing of components, actions, and reducers is done with `Jest`.
