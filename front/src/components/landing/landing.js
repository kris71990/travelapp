import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as authActions from '../../actions/auth-actions';
import AuthForm from '../auth-form/auth-form';

function Landing(props) {
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

  const signupJSX = 
    <div>
      <h2>Signup</h2>
      <p>Already have an account?</p>
      <Link to="/login">Login</Link>
      <AuthForm onComplete={ initSignup } type="signup"/>
    </div>;

  const loginJSX = 
    <div>
      <h2>Login</h2>
      <p>No account?</p>
      <Link to="/signup">Signup</Link>
      <AuthForm onComplete={ initLogin } type="login"/>
    </div>;

  return (
    <div className="landing">
      <h1>Landing.</h1>
      { location.pathname === '/' && !token ? signupJSX : undefined }
      { location.pathname === '/signup' ? signupJSX : undefined }
      { location.pathname === '/login' ? loginJSX : undefined }
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
