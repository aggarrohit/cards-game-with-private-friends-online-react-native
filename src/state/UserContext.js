// Node modules
import {createContext, useContext, useState} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const Context = createContext();

// Methods
export function UserProvider({children}) {
  // Local state
  const [stompClient, setStompClient] = useState();
  const [userName, setUserName] = useState();
  const [isConnected, setConnected] = useState(false);

  const getUrl = () => {
    return `${process.env.REACT_APP_BASE_URL}ws?username=${userName}`;
  };

  const loginConnect = () => {
    const sock = new SockJS(getUrl());
    const stompClient = Stomp.over(sock);

    stompClient.connect(
      {},
      function (frame) {
        setConnected(true);
        setStompClient(stompClient);
      },
      () => {
        setConnected(false);
      },
    );
  };

  const value = {
    userName,
    setUserName,
    isConnected,
    stompClient,
    loginConnect,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useUser() {
  const context = useContext(Context);
  const errorText =
    'To use useUser(), wrap the parent component with <UserProvider/>';

  // Safeguards
  if (!context) throw new Error(errorText);

  return context;
}
