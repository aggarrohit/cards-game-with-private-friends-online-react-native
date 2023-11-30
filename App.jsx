import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {UserProvider} from './src/state/UserContext';
import MainRoute from './src/routes.jsx/MainRoute';

const App = () => {
  return (
    <SafeAreaView>
      <UserProvider>
        <MainRoute />
      </UserProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
