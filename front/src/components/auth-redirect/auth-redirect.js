import React from 'react';
import { Redirect } from 'react-router-dom';

function AuthRedirect() {
  const redirectRoute = '/signup';
  return (
    <div>
      <Redirect to={ redirectRoute }/>
    </div>
  );
}

export default AuthRedirect;
