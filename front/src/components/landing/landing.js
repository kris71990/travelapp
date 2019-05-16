import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as authActions from '../../actions/auth-actions';
import AuthForm from '../auth-form/auth-form';
import UnitConverter from '../unit-converter/unit-converter';

import './landing.scss';

function Landing(props) {
  const [toggle, setToggle] = useState(false);
  const { 
    token, signup, login, history, location, 
  } = props;

  function initLogin(user) {
    return login(user)
      .then(() => {
        history.push('/me');
      })
      .catch(console.error);
  } 

  function initSignup(user) {
    return signup(user)
      .then(() => {
        history.push('/me');
      })
      .catch(console.error);
  }

  function handleToggle() {
    setToggle(!toggle);
  }

  const signupJSX = 
    <div className="auth">
      <div>
        <h3>~ Signup ~</h3>
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>
      <AuthForm onComplete={ initSignup } type="signup"/>
    </div>;

  const loginJSX = 
    <div className="auth">
      <div>
        <h3>~ Login ~</h3>
        <p>No account?</p>
        <Link to="/signup">Signup</Link>
      </div>
      <AuthForm onComplete={ initLogin } type="login"/>
    </div>;

  return (
    <div className="landing">
      <header>
        <h1>TripTracker</h1>
        <div>
          <button onClick={ handleToggle }>{ toggle ? 'Close' : 'Convert Units'}</button>
        </div>
      </header>
      { toggle ? 
        <div className="converters">
          <UnitConverter type="temp"/> 
          <UnitConverter type="len"/>
        </div>
        : null 
      }
      { !toggle && location.pathname === '/' && !token ? signupJSX : undefined }
      { !toggle && location.pathname === '/signup' ? signupJSX : undefined }
      { !toggle && location.pathname === '/login' ? loginJSX : undefined }
      <footer></footer>
    </div>
  );
}

Landing.propTypes = {
  signup: PropTypes.func,
  login: PropTypes.func,
  token: PropTypes.string,
  history: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.auth,
});

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(authActions.signupRequest(user)),
  login: user => dispatch(authActions.loginRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
