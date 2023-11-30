import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useUser} from '../state/UserContext';
import {InputView} from '../components/InputView';
import {Game} from './Game';

export const Home = () => {
  const {stompClient, userName} = useUser();
  const [roomId, setRoomId] = useState();
  const [numberOfPlayers, setNumberOfPlayers] = useState();
  const [tableId, setTableId] = useState();

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe(
        `/user/${userName}/callback/tableid`,
        function (message) {
          setTableId(message.body);
        },
      );
    }
  }, [stompClient]);

  const createTable = () => {
    stompClient.send(
      `/app/createTable`,
      {},
      JSON.stringify({
        content: numberOfPlayers,
        action: '',
        sender: '',
      }),
    );
  };

  const connectToRoom = id => {
    const tableId = typeof id == 'string' ? id : roomId;
    stompClient.send(
      `/app/subscribeToTable/${tableId}`,
      {},
      JSON.stringify({
        content: tableId + '',
        action: '',
        sender: '',
      }),
    );
    setTableId(tableId);
  };

  if (tableId) return <Game tableId={tableId} setTableId={setTableId} />;

  return (
    <View style={styles.container}>
      <View>
        <InputView
          title={'Enter room id'}
          value={roomId}
          setValue={setRoomId}
          placeholder="room id"
          inputMode="numeric"
          maxLength={4}
          action={connectToRoom}
          actionTitle={'Connect'}
        />
        <InputView
          title={'Enter number of players'}
          value={numberOfPlayers}
          setValue={setNumberOfPlayers}
          placeholder="#Players"
          inputMode="numeric"
          maxLength={1}
          action={createTable}
          actionTitle={'Create Room'}
        />
      </View>
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
  },
});
