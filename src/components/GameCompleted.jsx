import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {ColorCircle} from './ColorCircle';

export const GameCompleted = ({table, restartGame, home}) => {
  return (
    <View
      style={{
        // flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white', marginVertical: 20, fontSize: 25}}>
        Game Completed
      </Text>
      {table.playersCommons.map((player, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '50%',
              borderBottomColor: 'white',
              borderBottomWidth: 1,
              paddingVertical: 5,
            }}>
            <Text style={{color: 'white', fontSize: 18}}>{player.name}</Text>
            <Text style={{color: 'white', fontSize: 18}}>
              {player.rank == 0 ? 'Loose' : player.rank}
            </Text>
          </View>
        );
      })}

      <TouchableOpacity style={{marginTop: 50}} onPress={home}>
        <Text
          style={{
            color: 'white',
            textDecorationLine: 'underline',
            fontSize: 20,
          }}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop: 50}} onPress={restartGame}>
        <Text
          style={{
            color: 'white',
            textDecorationLine: 'underline',
            fontSize: 20,
          }}>
          Restart Game
        </Text>
      </TouchableOpacity>
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
