import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export const ActionButton = ({title, backgroundColor, onPress}) => {
  return (
    <TouchableOpacity style={{marginBottom: 10}} onPress={onPress}>
      <Text
        style={[
          styles.text,
          {
            backgroundColor: backgroundColor,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
    width: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    color: 'white',
  },
});
