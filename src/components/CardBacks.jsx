import React from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import BackTop from '../assets/cards/back.png';
import BackLeft from '../assets/cards/back_left.png';
import BackRight from '../assets/cards/back_right.png';

const screenWidth = Dimensions.get('window').width;

export const CardBacks = ({index, place}) => {
  return (
    <Image
      source={place == 'top' ? BackTop : place == 'left' ? BackLeft : BackRight}
      style={
        place == 'top'
          ? [
              styles.top,
              {marginLeft: index == 0 ? 0 : -(screenWidth - 250) / 3},
            ]
          : place == 'left'
          ? [
              styles.left,
              {
                marginTop: index == 0 ? 0 : -(screenWidth - 250) / 3,
              },
            ]
          : [
              styles.right,
              {
                marginTop: index == 0 ? 0 : -(screenWidth - 250) / 3,
              },
            ]
      }
    />
  );
};

const styles = StyleSheet.create({
  top: {
    width: (screenWidth - 220) / 3,
    height: (screenWidth - 220) / 2,
  },
  left: {
    width: (screenWidth - 220) / 2,
    height: (screenWidth - 220) / 3,
  },
  right: {
    width: (screenWidth - 220) / 2,
    height: (screenWidth - 220) / 3,
  },
});
