import React from 'react';
import {StyleSheet, Image} from 'react-native';

export const Card = ({card, index}) => {
  const images = {
    green_0: require(`../assets/cards/green-0-card-clipart.png`),
    green_1: require(`../assets/cards/green-1-card-clipart.png`),
    green_2: require(`../assets/cards/green-2-card-clipart.png`),
    green_3: require(`../assets/cards/green-3-card-clipart.png`),
    green_4: require(`../assets/cards/green-4-card-clipart.png`),
    green_5: require(`../assets/cards/green-5-card-clipart.png`),
    green_6: require(`../assets/cards/green-6-card-clipart.png`),
    green_7: require(`../assets/cards/green-7-card-clipart.png`),
    green_8: require(`../assets/cards/green-8-card-clipart.png`),
    green_9: require(`../assets/cards/green-9-card-clipart.png`),
    red_0: require(`../assets/cards/red-0-card-clipart.png`),
    red_1: require(`../assets/cards/red-1-card-clipart.png`),
    red_2: require(`../assets/cards/red-2-card-clipart.png`),
    red_3: require(`../assets/cards/red-3-card-clipart.png`),
    red_4: require(`../assets/cards/red-4-card-clipart.png`),
    red_5: require(`../assets/cards/red-5-card-clipart.png`),
    red_6: require(`../assets/cards/red-6-card-clipart.png`),
    red_7: require(`../assets/cards/red-7-card-clipart.png`),
    red_8: require(`../assets/cards/red-8-card-clipart.png`),
    red_9: require(`../assets/cards/red-9-card-clipart.png`),
    yellow_0: require(`../assets/cards/yellow-0-card-clipart.png`),
    yellow_1: require(`../assets/cards/yellow-1-card-clipart.png`),
    yellow_2: require(`../assets/cards/yellow-2-card-clipart.png`),
    yellow_3: require(`../assets/cards/yellow-3-card-clipart.png`),
    yellow_4: require(`../assets/cards/yellow-4-card-clipart.png`),
    yellow_5: require(`../assets/cards/yellow-5-card-clipart.png`),
    yellow_6: require(`../assets/cards/yellow-6-card-clipart.png`),
    yellow_7: require(`../assets/cards/yellow-7-card-clipart.png`),
    yellow_8: require(`../assets/cards/yellow-8-card-clipart.png`),
    yellow_9: require(`../assets/cards/yellow-9-card-clipart.png`),
    blue_0: require(`../assets/cards/blue-0-card-clipart.png`),
    blue_1: require(`../assets/cards/blue-1-card-clipart.png`),
    blue_2: require(`../assets/cards/blue-2-card-clipart.png`),
    blue_3: require(`../assets/cards/blue-3-card-clipart.png`),
    blue_4: require(`../assets/cards/blue-4-card-clipart.png`),
    blue_5: require(`../assets/cards/blue-5-card-clipart.png`),
    blue_6: require(`../assets/cards/blue-6-card-clipart.png`),
    blue_7: require(`../assets/cards/blue-7-card-clipart.png`),
    blue_8: require(`../assets/cards/blue-8-card-clipart.png`),
    blue_9: require(`../assets/cards/blue-9-card-clipart.png`),
    blue_draw_two: require(`../assets/cards/blue-draw-two-card-clipart.png`),
    blue_reverse: require(`../assets/cards/blue-reverse-card-clipart.png`),
    blue_skip: require(`../assets/cards/blue-skip-card-clipart.png`),
    yellow_draw_two: require(`../assets/cards/yellow-draw-two-card-clipart.png`),
    yellow_reverse: require(`../assets/cards/yellow-reverse-card-clipart.png`),
    yellow_skip: require(`../assets/cards/yellow-skip-card-clipart.png`),
    green_draw_two: require(`../assets/cards/green-draw-two-card-clipart.png`),
    green_reverse: require(`../assets/cards/green-reverse-card-clipart.png`),
    green_skip: require(`../assets/cards/green-skip-card-clipart.png`),
    red_draw_two: require(`../assets/cards/red-draw-two-card-clipart.png`),
    red_reverse: require(`../assets/cards/red-reverse-card-clipart.png`),
    red_skip: require(`../assets/cards/red-skip-card-clipart.png`),
    wild_draw: require(`../assets/cards/wild-draw-four-card-clipart.png`),
    wild: require(`../assets/cards/wild-card-clipart.png`),
  };

  const getImageName = () => {
    switch (card.cardType) {
      case 'NUMBER':
        return `${card.colorType.toLowerCase()}_${card.number}`;
      case 'DRAW2':
        return `${card.colorType.toLowerCase()}_draw_two`;
      case 'WILDDRAW4':
        return 'wild_draw';
      case 'WILD':
        return 'wild';
      case 'REVERSE':
        return `${card.colorType.toLowerCase()}_reverse`;
      case 'SKIP':
        return `${card.colorType.toLowerCase()}_skip`;
      default:
        return 'wild';
    }
  };

  return (
    <Image
      source={images[getImageName()]}
      style={{width: 75, height: 105, marginLeft: index == 0 ? 0 : -45}}
    />
  );
};

const styles = StyleSheet.create({});
