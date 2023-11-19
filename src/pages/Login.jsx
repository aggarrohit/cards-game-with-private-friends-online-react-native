import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useUser} from '../state/UserContext';
import {InputView} from '../components/InputView';

export const Login = () => {
  const {userName, setUserName, loginConnect} = useUser();

  const loginClicked = () => {
    if (userName && userName.length < 4) {
      alert('please enter atleast 4 characters');
      return;
    }
    loginConnect();
  };

  return (
    <View style={styles.container}>
      <InputView
        title={'Enter user name'}
        value={userName}
        setValue={setUserName}
        placeholder="username"
        inputMode="text"
        maxLength={0}
        action={loginClicked}
        actionTitle={'Login'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    height: '100%',
    width: '100%',
  },
});
