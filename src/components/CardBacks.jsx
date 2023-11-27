import React from 'react';
import {StyleSheet, Image} from 'react-native';
import BackTop from '../assets/cards/back.png';
import BackLeft from '../assets/cards/back_left.png';
import BackRight from '../assets/cards/back_right.png';

export const CardBacks = ({index, place}) => {
  return (
    <Image
      source={place == 'top' ? BackTop : place == 'left' ? BackLeft : BackRight}
      style={
        place == 'top'
          ? {width: 75, height: 105, marginLeft: index == 0 ? 0 : -55}
          : place == 'left'
          ? {
              width: 105,
              height: 75,
              marginTop: index == 0 ? 0 : -55,
              marginLeft: 5,
            }
          : {
              width: 105,
              height: 75,
              marginTop: index == 0 ? 0 : -55,
              marginRight: 5,
            }
      }
    />
  );
};

const styles = StyleSheet.create({});
