import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileForm from '../profile-form/profile-form';
import PlaceForm from '../place-form/place-form';
import CityForm from '../city-form/city-form';
import PlaceList from '../places-list/places-list';
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

  function handleUpdateSimple(prof) {
    updateProfile(prof)
      .then(() => handleEdit());
  }

  let headerJSX; 
  if (profile) {
    headerJSX = 
      <header>
        <h1>TravelAid - Welcome { profile.firstName }.</h1>
        <div>
          <button onClick={ handleEdit }>{ edit ? 'Close' : 'Edit' }</button>
          <button onClick={ logout }>Logout</button>
        </div>
      </header>;
  } else {
    headerJSX = 
      <header>
        <h1>TravelAid</h1>
        <div>
          <button onClick={ logout }>Logout</button>
        </div>
      </header>;
  }

  return (
    <div className="dashboard">
      { headerJSX }
      { profile && !edit
        ? 
          <div className="locs">
            <div id="list">
              <h3>Recently Visited.</h3>
              <PlaceList locations={ profile.locationsVisited }/>
              <h3>Next to visit.</h3>
              <PlaceList locations={ profile.locationsToVisit }/>
            </div>
            <div id="forms">
              <PlaceForm profile={ profile } type="visited" onComplete={ updateProfile }/> 
              <PlaceForm profile={ profile } type="toVisit" onComplete={ updateProfile }/> 
              <CityForm profile={ profile } type="visited" onComplete={ updateProfile }/>
              <CityForm profile={ profile } type="toVisit" onComplete={ updateProfile }/>
            </div>
          </div>
        : 
        <div className="prof">
          <h3>{ profile ? 'Edit' : 'Create' } your profile.</h3>
          {
            profile ? 
              <ProfileForm profile={ profile } onComplete={ handleUpdateSimple }/> 
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
