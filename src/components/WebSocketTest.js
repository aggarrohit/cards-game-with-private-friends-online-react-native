import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const WebSocketTest = () => {
  const [message, setMessage] = useState('');

  const wsUrlSender = process.env.REACT_APP_BASE_URL + 'ws?username=rohit';

  const sock = new SockJS(wsUrlSender);
  const stompClient = Stomp.over(sock);

  useEffect(() => {
    sock.onopen = function () {
      console.log('open');
    };
    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);

      stompClient.subscribe('/table/public', function (greeting) {
        console.log('received message in chatroom : ' + greeting.body);
        setMessage(greeting.body);
      });
    });
  }, []);

  const sendMessage = () => {
    stompClient.send(
      '/app/action',
      {},
      JSON.stringify({content: '', sender: '', type: 'CREATE_ROOM'}),
    );
  };

  return (
    <View>
      <Button onPress={() => sendMessage()} title="send message"></Button>
      <Text>web socket page</Text>
      <Text>Received Message: {message}</Text>
    </View>
  );
};
