import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {ColorCircle} from './ColorCircle';
import {ActionButton} from './ActionButton';

export const ChallengeOptions = ({
  drawCards,
  challenge,
  previousColor,
  numberOfAccumulatedCards,
}) => {
  const colorChoosen = () => {
    alert('This was the color of previous card!');
  };

  return (
    <View style={{width: '80%', marginBottom: 10, alignItems: 'center'}}>
      <Text style={{color: 'white', marginVertical: 5}}>Pick Option</Text>
      <View style={styles.optionsRow}>
        <ActionButton
          backgroundColor={'red'}
          onPress={drawCards}
          title={`Pick ${numberOfAccumulatedCards + 4} Cards`}
        />
        <ColorCircle
          backgroundColor={
            previousColor ? previousColor.toLowerCase() : 'white'
          }
          colorChoosen={colorChoosen}
        />
        <ActionButton
          backgroundColor={'green'}
          onPress={challenge}
          title={'Challenge'}
        />
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
  optionsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});
