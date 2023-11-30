import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Card} from './Card';
import Circle from '../assets/circle2.png';

export const ActiveCardAndColor = ({table}) => {
  const backgroundColor = table.activeColor
    ? table.activeColor.toLowerCase()
    : 'black';
  const isReversed = table.reversed;

  return (
    <View style={[styles.outerView]}>
      <Image
        source={Circle}
        tintColor={backgroundColor}
        style={[
          styles.circleImage,
          {
            transform: [{rotateX: isReversed ? '180deg' : '0deg'}],
          },
        ]}
      />

      <Card index={0} card={table.activecard} />
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
  circleImage: {
    height: 185,
    width: 185,
    position: 'absolute',
    left: -15,
  },
});
