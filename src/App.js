import React from 'react';
import AuthContextProvider from './context/store';

import Navigator from './Navigator';

import './App.css';

const App = () => {
  return (
    <AuthContextProvider>
      <Navigator />
    </AuthContextProvider>
  );
};

export default App;
