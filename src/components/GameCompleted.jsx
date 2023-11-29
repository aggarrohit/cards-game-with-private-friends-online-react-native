import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

export const GameCompleted = ({table, restartGame, home}) => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white', marginVertical: 20, fontSize: 25}}>
        Game Completed
      </Text>
      {table.playersCommons.map((player, index) => {
        return (
          <View key={index} style={styles.playerRow}>
            <Text style={styles.playerTitle}>{player.name}</Text>
            <Text style={styles.playerRank}>
              {player.rank == 0 ? 'Lose' : player.rank}
            </Text>
          </View>
        );
      })}

      <TouchableOpacity style={styles.gap} onPress={home}>
        <Text style={styles.homeButton}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.gap} onPress={restartGame}>
        <Text style={styles.restartButton}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  playerTitle: {color: 'white', fontSize: 18},
  playerRank: {color: 'white', fontSize: 18},
  homeButton: {
    color: 'white',
    textDecorationLine: 'underline',
    fontSize: 20,
  },
  restartButton: {
    color: 'white',
    textDecorationLine: 'underline',
    fontSize: 20,
  },
  gap: {marginTop: 50},
});
