import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useUser} from '../state/UserContext';
import {ActiveCardAndColor} from '../components/ActiveCardAndColor';
import {GameCompleted} from '../components/GameCompleted';
import {WaitingForOthers} from '../components/WaitingForOthers';
import {TopPlayerView} from '../components/TopPlayerView';
import {SelfCardsAndActions} from '../components/SelfCardsAndActions';
import {LeftAndRightPlayers} from '../components/LeftAndRightPlayers';

const screenWidth = Dimensions.get('window').width;

export const Game = ({tableId, setTableId}) => {
  const {stompClient, userName} = useUser();
  const [table, setTable] = useState();
  const [myCards, setMyCards] = useState();
  const [messageReceived, setMessageReceived] = useState('');

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe(
        `/user/${userName}/queue/private-message`,
        function (message) {
          setMessageReceived(message.body);
        },
      );

      stompClient.subscribe(
        `/user/${userName}/queue/my-cards`,
        function (message) {
          updateCards(message.body);
        },
      );

      stompClient.subscribe(
        `/table/${tableId}/table-updates`,
        function (tableMessage) {
          updateTable(tableMessage.body);
        },
      );
    }
  }, [stompClient]);

  const updateCards = cardsString => {
    const cardsArray = JSON.parse(cardsString);
    setMyCards([...cardsArray]);
  };

  const updateTable = tableString => {
    try {
      const tableObject = JSON.parse(tableString);
      setTable({...tableObject});
      setMessageReceived('');
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  const home = () => {
    setTableId();
  };

  const restartGame = () => {
    stompClient.send(`/app/restartGame/${tableId}`, {}, {});
  };

  if (table == undefined) return <WaitingForOthers tableId={tableId} />;

  if (table.gameCompleted) {
    return (
      <GameCompleted restartGame={restartGame} home={home} table={table} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{messageReceived}</Text>
      <ActiveCardAndColor table={table} />

      {/* showing top player deck size and name */}
      <TopPlayerView table={table} userName={userName} />

      {/* showing self cards and buttons */}
      <SelfCardsAndActions
        table={table}
        userName={userName}
        myCards={myCards}
        stompClient={stompClient}
      />

      {/* shows left and right players */}
      <LeftAndRightPlayers table={table} userName={userName} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    padding: 10,
  },

  message: {
    color: 'white',
    position: 'absolute',
    fontSize: 20,
    top: screenWidth - 200,
    zIndex: 12,
  },
});
