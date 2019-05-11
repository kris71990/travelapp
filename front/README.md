# TripTracker - Frontend

<img src="src/assets/flag-banner.png">


![Travis (.com) branch](https://img.shields.io/travis/com/kris71990/travelapp/master.svg?style=popout)
![Coverage](https://img.shields.io/badge/coverage-96%25-bright%20green.svg)
[![David](https://img.shields.io/david/expressjs/express.svg)]( https://github.com/kris71990/travelapp)
![version](https://img.shields.io/badge/version-1.0.0-blue.svg)
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/kris71990/travelapp)

---

**Author: Kris Sakarias**

**Version: 1.0.0**

---
## Overview
---

Track your travels with TripTracker. Create an account and add countries, cities, and other locations that you have visited or are planning on visiting. Plot them on a map to see a visual representation of your journey.

The user will interact with a frontend built with **React** and **Redux**, transpiled from modern Javascript (**ES6**) with **Babel**, and bundled with **Webpack**.

---
## Documentation
---

#### Component Architecture 

Components are entirely functional and cleanly implemented with **React hooks**.


`App` -> `Auth-Redirect`

* `Landing`
  * `AuthForm`
* `Dashboard`
  * `PlaceList`
  * `CountryForm`
  * `CityForm`
  * `ProfileForm`


#### Component Functionality

+ `App`
  - This wrapper component is rendered to the DOM
  - Will always render the `Auth-Redirect` component, which will then render either the `Landing` or `Dashboard` depending on if the user is logged in.

+ `Landing`
  - If a user is not logged in, they will be redirected to the `Landing` page which will render the `AuthForm`.

+ `AuthForm`
  - Doubles as login/signup functionality
  - If signing up, the user will be prompted to enter:
    - Username (`string`)
    - Email (`string`)
    - Password (`string`)*
  - The user's account will be created and logged in*
  - If logging in, the user must enter their username and password

+ `Dashboard`
  - If the user is logged in, they will be redirected to the `Dashboard`. The dashboard is composed of several subcomponents.

+ `CountryForm`
  - A form for the user to enter a country they have either visited or plan to visit (one form is rendered for each option)
  - Input is a `string` of the name of a country
  - Once a country is added, the user's profile will be updated and the appropriate `PlaceList` will be re-rendered to reflect the addition.

+ `CityForm`
  - Once the user adds a country, they will then be able to add cities or other locations for that country. 
  - Input is a `string` of the name of a city or location in the country. Multiple cities or locations may be added at once by separating each with a comma (e.g. `beijing, shanghai, nanjing`) 
  - Once the cities are added, the user's profile will be updated and the appropriate `PlaceList` will be re-rendered to reflect the addition.

+ `PlaceList`
  - There are currenty three `PlaceList` components rendered as the user adds countries and cities.
  - The first reflects the countries the user has visited.
  - The second reflects the countries the user wants to visit.
  - The third orders the user's most well travelled countries, in order of number of cities/locations visited.

+ `ProfileForm`
  - The `ProfileForm` is rendered after signup for the user to add some basic profile data:
    - Name (`string`) - used to greet the user
    - Age (`string`) - used to calculate the extent of a user's travels
    - Hometown (`string`) - used to note the extent of a user's travels, and is rendered as a special icon on the map view.
  - After initial profile creation, the form can be toggled with a button in the header for the user to change their profile data.

---
`*` A note on privacy

> A user's password is never stored in plain text. Upon receipt, it is hashed and immediately deleted. The hash is stored and compared to a hash of subsequent login attempt passwords to authenticate a user.

> User authentication is handled with [JSON Web Token](https://jwt.io). On a successful login, a token is created by signing against the account's unique token seed. This ensures private user interaction with the application. 

---
### Testing
---

Testing of actions, reducers, and components is done with `Jest`.