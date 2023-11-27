import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card} from './Card';

export const ActiveCardAndColor = ({table}) => {
  return (
    <View
      style={[
        styles.outerView,
        {
          backgroundColor: table.activeColor
            ? table.activeColor.toLowerCase()
            : 'black',
        },
      ]}>
      <View style={styles.innerView}>
        <Card index={0} card={table.activecard} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerView: {
    height: 145,
    width: 145,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 125,
  },
  innerView: {
    backgroundColor: 'black',
    height: 135,
    width: 135,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 125,
  },
});
