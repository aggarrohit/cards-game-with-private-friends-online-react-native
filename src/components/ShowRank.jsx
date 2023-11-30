import React from 'react';
import {StyleSheet, Image} from 'react-native';
import First from '../assets/first.png';
import Second from '../assets/second.png';
import Third from '../assets/third.png';

export const ShowRank = ({rank}) => {
  return (
    <Image
      source={rank == 1 ? First : rank == 2 ? Second : Third}
      style={{height: 100, width: 100}}
    />
  );
};

const styles = StyleSheet.create({});
