import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useUser} from '../state/UserContext';
import {InputView} from '../components/InputView';

export const Home = () => {
  const {stompClient} = useUser();
  const [roomId, setRoomId] = useState();

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

  const createRoom = async () => {
    const resp = await fetch(`${process.env.REACT_APP_BASE_URL}generateTable`);
    if (resp.ok) {
      const respJson = await resp.json();

      const tableId = JSON.stringify(respJson);
      console.log('tableId : ' + tableId);
      setRoomId(tableId);

      connectToRoom(tableId);
    }
  };

  const connectToRoom = id => {
    stompClient.subscribe(`/table/${id || roomId}`, function (tableMessage) {
      console.log('received message in table : ' + tableMessage.body);
    });
  };

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
        <Text>Create Room</Text>
        <Button onPress={() => createRoom()} title="Create Room"></Button>
        <View style={{height: 20}}></View>
        <Button onPress={() => sendTestMessage()} title="send msg"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    height: '100%',
    width: '100%',
  },
});
