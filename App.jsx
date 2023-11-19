import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {UserProvider} from './src/state/UserContext';
import MainRoute from './src/routes.jsx/MainRoute';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <UserProvider>
        <MainRoute />
      </UserProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
