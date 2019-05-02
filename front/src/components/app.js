import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// import AuthRedirect from './auth-redirect/auth-redirect';
import Landing from './landing/landing';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* <Route path='*' component={ AuthRedirect }/> */}
        <Route exact path='/' component={ Landing }/>
        {/* <Route exact path='/login' component={ Landing }/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
