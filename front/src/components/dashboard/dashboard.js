import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileForm from '../profile-form/profile-form';
import * as authActions from '../../actions/auth-actions';
import * as profileActions from '../../actions/profile-actions';

import './dashboard.scss';

function Dashboard(props) {
  const { 
    profile, logout, createProfile, updateProfile, fetchProfile, 
  } = props;
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  function handleEdit() {
    setEdit(!edit);
  }

  function handleUpdate() {
    return updateProfile(profile);
  }

  return (
    <div className="dashboard">
      <div id="header">
        {/* <h1>TravelAid</h1> */}
        { profile ? <h1>Welcome {profile.firstName}</h1> : null }
        { profile ? 
          <div>
            <button onClick={ handleEdit }>Edit</button>
            <button onClick={ logout }>Logout</button>
          </div>
          : <div><button onClick={ logout }>Logout</button></div>
        }
      </div>
      { profile && !edit
        ? <h1>Map here</h1> 
        : 
        <div className="prof">
          <h3>{ profile ? 'Edit' : 'Create' } your profile.</h3>
          {
            profile ? 
              <ProfileForm profile={profile} onComplete={ handleUpdate }/> 
              : <ProfileForm onComplete={ createProfile }/> 
          }
        </div>
      }
    </div>
  );
}

Dashboard.propTypes = {
  logout: PropTypes.func,
  profile: PropTypes.object,
  createProfile: PropTypes.func,
  updateProfile: PropTypes.func,
  fetchProfile: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(profileActions.fetchProfileReq()),
  createProfile: profile => dispatch(profileActions.createProfileReq(profile)),
  updateProfile: profile => dispatch(profileActions.updateProfileReq(profile)),
  logout: () => dispatch(authActions.logout()),
});

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
