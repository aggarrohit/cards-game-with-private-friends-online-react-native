import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActionButton} from './ActionButton';

export const ActionButtons = ({actionButton}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <ActionButton
        backgroundColor={'orange'}
        onPress={() => actionButton('pickCard')}
        title={'Pick Card'}
      />
      <ActionButton
        backgroundColor={'gray'}
        onPress={() => actionButton('skip')}
        title={'Pass'}
      />
      <ActionButton
        backgroundColor={'green'}
        onPress={() => actionButton('unoSaid')}
        title={'UNO'}
      />
      <ActionButton
        backgroundColor={'red'}
        onPress={() => actionButton('caughtSaid')}
        title={'Caught'}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
