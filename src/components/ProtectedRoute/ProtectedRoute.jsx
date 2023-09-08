import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

// THIS IS NOT SECURITY! That must be done on the server
// A malicious user could change the code and see any view
// so your server-side route must implement real security
// by checking req.isAuthenticated for authentication
// and by checking req.user for authorization

function ProtectedRoute({ component, children, ...props }) {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user);
  const entry = useSelector(store => store.entry);

  // Component may be passed in as a "component" prop,
  // or as a child component.
  //^ This is a very foreign line of code to me
  const ProtectedComponent = component || (() => children);

  // get default entry for user upon login
  //! do I need to clear the entry upon logout?
  //! This appears to run (and evaluate the same) for every protected route upon initial rendering.
  if(user.id && !entry) {
    // console.log('user: MATCH || entry: FAIL')
    dispatch({type: 'FETCH_ENTRY', payload: {user, entryQuery: 0}})
  }

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...props}
    >
      {user.id ?
        // If the user is logged in, show the protected component
        <ProtectedComponent />
        :
        // Otherwise, redirect to the Loginpage
        <LoginPage />
      }
    </Route>

  );
}

export default ProtectedRoute;
