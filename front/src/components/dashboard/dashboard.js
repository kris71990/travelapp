import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileForm from '../profile-form/profile-form';
import PlaceForm from '../place-form/place-form';
import CityForm from '../city-form/city-form';
import PlaceList from '../places-list/places-list';
import PlaceMap from '../place-map/place-map';
import CityMap from '../city-map/city-map';
import * as authActions from '../../actions/auth-actions';
import * as profileActions from '../../actions/profile-actions';

import './dashboard.scss';
import UnitConverter from '../unit-converter/unit-converter';

function Dashboard(props) {
  const { 
    profile, logout, createProfile, updateProfile, fetchProfile, 
  } = props;
  const [toggle, setToggle] = useState(false);
  const [edit, setEdit] = useState(false);
  const [convertToggle, setConvertToggle] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  function handleEdit() {
    setEdit(!edit);
  }

  function handleToggle() {
    setToggle(!toggle);
  }

  function handleUpdateSimple(prof) {
    updateProfile(prof)
      .then(() => handleEdit());
  }

  function handleConvert() {
    setConvertToggle(!convertToggle);
  }

  let headerJSX; 
  if (profile) {
    headerJSX = 
      <header>
        <h1>TripTracker <span>/ Welcome { profile.firstName }.</span></h1>
        <div>
          <button onClick={ handleConvert }>{ convertToggle ? 'Close' : 'Convert' }</button>
          <button onClick={ handleToggle }>{ toggle ? 'Close' : 'Map'}</button>
          <button onClick={ handleEdit }>{ edit ? 'Close' : 'Edit' }</button>
          <button onClick={ logout }>Logout</button>
          <div id="mobile-menu">
            <ul>
              <li onClick={ handleConvert }>{ convertToggle ? 'Close' : 'Convert' }</li>
              <li onClick={ handleToggle }>{ toggle ? 'Close' : 'Map'}</li>
              <li onClick={ handleEdit }>{ edit ? 'Close' : 'Edit' }</li>
              <li onClick={ logout }>Logout</li>
            </ul>
          </div>
        </div>
      </header>;
  } else {
    headerJSX = 
      <header>
        <h1>TripTracker</h1>
        <div>
          <button onClick={ logout }>Logout</button>
        </div>
      </header>;
  }

  return (
    <div className="dashboard">
      { headerJSX }
      { !convertToggle ?
        profile && !edit 
          ? 
          <div className="locs">
            <div id="list">
              { toggle ? 
                <div>
                  <h2>Map Views</h2>
                  <PlaceMap visited={ profile.locationsVisited } toVisit={ profile.locationsToVisit }/> 
                  <CityMap visited={ profile.locationsVisited } toVisit={ profile.locationsToVisit }/>
                </div>
                : null
              }
              { !toggle && profile.locationsVisited.length > 0 ?
                  <div>
                    <h3>Recently visited...</h3>
                    <PlaceList locations={ profile.locationsVisited } sortType={ 'date' }/>
                  </div>
                : null
              }
              { !toggle && profile.locationsToVisit.length > 0 ?
                  <div>
                    <h3>Planning to visit...</h3>
                    <PlaceList locations={ profile.locationsToVisit } sortType={ 'date' }/>
                  </div>
                : null
              }
              { !toggle && profile.locationsVisited.length > 0 ?
                  <div>
                    <h3>Most travelled...</h3>
                    <PlaceList locations={ profile.locationsVisited } sortType={ 'cities' }/>
                  </div>
                : null
              }
            </div>
            <div id="forms">
              <h3>Add destinations...</h3>
              <PlaceForm profile={ profile } type="visited" onComplete={ updateProfile }/> 
              <PlaceForm profile={ profile } type="toVisit" onComplete={ updateProfile }/> 
              <CityForm profile={ profile } type="visited" onComplete={ updateProfile }/>
              <CityForm profile={ profile } type="toVisit" onComplete={ updateProfile }/>
            </div>
          </div>
          : 
          <div className="prof">
            <h3>~ { profile ? 'Edit' : 'Create' } your profile ~</h3>
            {
              profile ? 
                <ProfileForm profile={ profile } onComplete={ handleUpdateSimple }/> 
                : <ProfileForm onComplete={ createProfile }/> 
            }
          </div>
        : 
          <div className="converters">
            <UnitConverter type="temp"/>
            <UnitConverter type="length"/>
          </div>
      }
      <footer></footer>
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
