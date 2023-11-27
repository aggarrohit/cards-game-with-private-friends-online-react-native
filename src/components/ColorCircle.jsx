import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

export const ColorCircle = ({backgroundColor, colorChoosen}) => {
  return (
    <TouchableOpacity onPress={() => colorChoosen(backgroundColor)}>
      <View
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: backgroundColor,
        }}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
    width: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
