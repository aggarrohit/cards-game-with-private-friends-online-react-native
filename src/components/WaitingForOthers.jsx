import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const WaitingForOthers = ({tableId}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'white'}}>
        waiting for others to join : {tableId}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    padding: 10,
  },
});
