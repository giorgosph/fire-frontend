import React, { useContext } from 'react';
import { AuthContext } from './context/store';

import Form from './screens/Form';
import LogIn from './screens/LogIn';

const Navigator = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isAuthenticated);

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
