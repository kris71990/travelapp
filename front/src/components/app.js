import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthRedirect from './auth-redirect/auth-redirect';
import Landing from './landing/landing';
import Dashboard from './dashboard/dashboard';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Route path='*' component={ AuthRedirect }/>
        <Route exact path='/' component={ Landing }/>
        <Route exact path='/login' component={ Landing }/>
        <Route exact path='/signup' component={ Landing }/>
        <Route exact path='/me' component={ Dashboard }/>
      </BrowserRouter>
    </div>
  );
}

App.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  loggedIn: !!state.auth,
});

export default connect(mapStateToProps, null)(App);
