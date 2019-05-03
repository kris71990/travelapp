import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as authActions from '../../actions/auth-actions';

function Dashboard(props) {
  const { logout } = props;

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={ logout }>Logout</button>
    </div>
  );
}

Dashboard.propTypes = {
  logout: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
});

export default connect(null, mapDispatchToProps)(Dashboard);
