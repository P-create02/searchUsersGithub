import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const PrivateRoute = ({children,...rest}) => { // rest to to w Route -> "exact path='/'"
  const { user, isAuthenticated } = useAuth0()
  // const isUser = false // to jest jakby nasz 'PrivateRoute' z App.js = true or false
  const isUser = isAuthenticated && user

  return <Route {...rest} render={() =>{
    return isUser ? children: <Redirect to='/login' /> // Redirect -> take back user to..
  }}></Route>
};

export default PrivateRoute;
