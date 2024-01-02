import React, { useContext, useEffect } from 'react';

import Form from './screens/Form';
import LogIn from './screens/LogIn';

import Cookies from 'js-cookie';
import { AuthContext } from './context/store';

const Navigator = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const token = Cookies.get("jwtToken");

    if(token) authCtx.authenticate(token);
  }, []);

  return (
    !authCtx.isAuthenticated ? 
      <LogIn /> 
    : 
      <>
        <Form /> 
        <button className="formButton logoutButton" onClick={authCtx.logout}>Log Out</button>
      </>  
  );
};

export default Navigator;
