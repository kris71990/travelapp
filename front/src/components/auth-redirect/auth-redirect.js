import React from 'react';
import { connect } from 'react-redux'; 
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthRedirect(props) {
  const { token, location } = props;
  let redirectRoute;
  
  if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
    if (token) {
      redirectRoute = '/me';
    }
  } else if (!token) {
    redirectRoute = '/signup';
  }

  return (
    <div>
      {
        redirectRoute ? <Redirect to={ redirectRoute }/> : undefined 
      }
    </div>
  );
}

AuthRedirect.propTypes = {
  token: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.auth,
});

export default connect(mapStateToProps)(AuthRedirect);
