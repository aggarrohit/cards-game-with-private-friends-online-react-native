import React from 'react';
import {useUser} from '../state/UserContext';
import {Home} from '../pages/Home';
import {Login} from '../pages/Login';

const MainRoute = () => {
  const {isConnected} = useUser();

  return isConnected ? <Home /> : <Login />;
};

export default MainRoute;
