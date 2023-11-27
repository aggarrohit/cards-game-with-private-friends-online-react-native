import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
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
          console.log('callback/tableid : ' + message.body);
          setTableId(message.body);
        },
      );
    }
  }, [stompClient]);

  const sendTestMessage = () => {
    stompClient.send(
      `/app/subscribeToTable/${roomId}`,
      {},
      JSON.stringify({
        content: 'test content',
        sender: '',
        type: 'CREATE_ROOM',
      }),
    );
  };

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
    console.log('connect to room: ' + tableId);
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
    // stompClient.subscribe(
    //   `/table/${typeof id == 'string' ? id : roomId}`,
    //   function (tableMessage) {
    //     console.log('received message in table : ' + tableMessage.body);
    //   },
    // );
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
        {/* <Text>Create Room</Text>
        <Button onPress={() => createTable()} title="Create Room"></Button>
        <View style={{height: 20}}></View>
        <Button onPress={() => sendTestMessage()} title="send msg"></Button> */}
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
