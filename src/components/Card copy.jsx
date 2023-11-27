import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

export const Card = ({card, index}) => {
  const getCardTitle = (cardType, number) => {
    switch (cardType) {
      case 'NUMBER':
        return number;
      case 'DRAW2':
        return '+2';
      case 'WILDDRAW4':
        return '+4';
      case 'WILD':
        return '00';
      case 'REVERSE':
        return '<>';
      case 'SKIP':
        return '!';

      default:
        return number;
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          marginLeft: index == 0 ? 0 : -45,
          backgroundColor:
            card.cardType == 'WILDDRAW4' || card.cardType == 'WILD'
              ? 'black'
              : card.colorType.toLowerCase(),
        },
      ]}>
      <Text style={styles.cardText}>
        {getCardTitle(card.cardType, card.number)}
      </Text>
      <Text style={[styles.cardText, styles.cardTextBottom]}>
        {getCardTitle(card.cardType, card.number)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 105,
    width: 75,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginLeft: 5,
    elevation: 5,
    shadowColor: 'black',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  cardTextBottom: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});
