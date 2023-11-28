import React from 'react';
import {StyleSheet, View, Text, ScrollView, Dimensions} from 'react-native';
import {getRawArray} from '../utils/Utils';
import {CardBacks} from './CardBacks';
import {ShowRank} from './ShowRank';

const screenWidth = Dimensions.get('window').width;

export const LeftAndRightPlayers = ({table, userName}) => {
  const getLeftPlayerId = () => {
    let myId;
    table.playersCommons.forEach(player => {
      if (player.name == userName) {
        myId = player.id;
      }
    });
    if (table.playersCommons.length == 3) {
      return myId == 0 ? 1 : myId == 1 ? 2 : 0;
    } else if (table.playersCommons.length == 4) {
      return myId == 0 ? 1 : myId == 1 ? 2 : myId == 2 ? 3 : 0;
    }
  };

  const getRightPlayerId = () => {
    let myId;
    table.playersCommons.forEach(player => {
      if (player.name == userName) {
        myId = player.id;
      }
    });

    return myId == 0 ? 3 : myId == 1 ? 0 : myId == 2 ? 1 : 2;
  };

  const getUserWithId = id => {
    let user;
    table.playersCommons.forEach(player => {
      if (player.id == id) {
        user = player;
      }
    });
    return user;
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        width: screenWidth,
      }}>
      {/* shows left player deck size and name */}
      <View>
        <ScrollView
          style={
            getLeftPlayerId() == table.activePlayerIndex && styles.highLight
          }>
          {table.playersCommons.length > 2 &&
            getRawArray(getUserWithId(getLeftPlayerId()).deckSize).map(
              (card, index) => {
                return <CardBacks key={index} index={index} place={'left'} />;
              },
            )}
        </ScrollView>
        {table.playersCommons.length > 2 &&
          getUserWithId(getLeftPlayerId()).rank != 0 && (
            <ShowRank rank={getUserWithId(getLeftPlayerId()).rank} />
          )}
        {table.playersCommons.length > 2 && (
          <Text style={styles.playerName}>
            {getUserWithId(getLeftPlayerId()).name}
          </Text>
        )}
      </View>

      {/* shows right player deck size and name */}
      <View>
        <ScrollView
          style={
            getRightPlayerId() == table.activePlayerIndex && styles.highLight
          }>
          {table.playersCommons.length > 3 &&
            getRawArray(getUserWithId(getRightPlayerId()).deckSize).map(
              (card, index) => {
                return <CardBacks key={index} index={index} place={'right'} />;
              },
            )}
        </ScrollView>
        {table.playersCommons.length > 3 &&
          getUserWithId(getRightPlayerId()).rank != 0 && (
            <ShowRank rank={getUserWithId(getRightPlayerId()).rank} />
          )}
        {table.playersCommons.length > 3 && (
          <Text style={styles.playerName}>
            {getUserWithId(getRightPlayerId()).name}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
