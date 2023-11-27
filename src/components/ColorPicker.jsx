import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {ColorCircle} from './ColorCircle';

export const ColorPicker = ({colorChoosen}) => {
  return (
    <View style={{width: '80%', marginBottom: 10}}>
      <Text style={{color: 'white', marginVertical: 2}}>Pick Color</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <ColorCircle backgroundColor={'red'} colorChoosen={colorChoosen} />
        <ColorCircle backgroundColor={'yellow'} colorChoosen={colorChoosen} />
        <ColorCircle backgroundColor={'blue'} colorChoosen={colorChoosen} />
        <ColorCircle backgroundColor={'green'} colorChoosen={colorChoosen} />
      </View>
    </View>
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
