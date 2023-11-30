import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {getRawArray} from '../utils/Utils';
import {CardBacks} from './CardBacks';
import {ShowRank} from './ShowRank';

export const TopPlayerView = ({table, userName}) => {
  const getTopPlayerId = () => {
    let myId;
    table.playersCommons.forEach(player => {
      if (player.name == userName) {
        myId = player.id;
      }
    });
    if (table.playersCommons.length == 2) {
      return myId == 0 ? 1 : 0;
    } else if (table.playersCommons.length == 3) {
      return myId == 0 ? 2 : myId == 1 ? 0 : 1;
    } else if (table.playersCommons.length == 4) {
      return myId == 0 ? 2 : myId == 1 ? 3 : myId == 2 ? 0 : 1;
    }
  };

  const getTopPlayer = () => {
    if (table.playersCommons.length < 2) return 0;
    let otherPlayer;

    table.playersCommons.forEach(player => {
      if (player.id == getTopPlayerId()) {
        otherPlayer = player;
      }
    });
    return otherPlayer;
  };

  return (
    <View style={styles.topCardsStyle}>
      {getTopPlayer() == undefined ? (
        <Text style={{color: 'red'}}>error</Text>
      ) : getTopPlayer().deckSize > 0 ? (
        <ScrollView
          horizontal
          style={
            getTopPlayer().id == table.activePlayerIndex && styles.highLight
          }>
          {getRawArray(getTopPlayer().deckSize).map((card, index) => {
            return <CardBacks key={index} index={index} place={'top'} />;
          })}
        </ScrollView>
      ) : (
        <ShowRank rank={getTopPlayer().rank} />
      )}
      <Text style={styles.playerName}>{getTopPlayer().name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topCardsStyle: {
    position: 'absolute',
    top: 0,
  },
  highLight: {
    borderColor: 'lime',
    borderWidth: 5,
    borderRadius: 15,
  },
  playerName: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 17,
    textTransform: 'capitalize',
    marginTop: 5,
  },
});
