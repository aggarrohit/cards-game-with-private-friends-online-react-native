import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useUser} from '../state/UserContext';
import {Card} from '../components/Card';
import {CardBacks} from '../components/CardBacks';
import {ColorPicker} from '../components/ColorPicker';
import {ActiveCardAndColor} from '../components/ActiveCardAndColor';
import {ActionButtons} from '../components/ActionButtons';
import {ShowRank} from '../components/ShowRank';
import {GameCompleted} from '../components/GameCompleted';

const screenWidth = Dimensions.get('window').width;

export const SelfCardsAndActions = ({tableId, setTableId}) => {
  const {stompClient, userName} = useUser();
  const [table, setTable] = useState();
  const [myIndex, setMyIndex] = useState();
  const [myCards, setMyCards] = useState();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [card, setCard] = useState();
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

  useEffect(() => {
    if (table) {
      const players = table.playersCommons;
      players.forEach(player => {
        if (player.name == userName) {
          setMyIndex(player.id);
        }
      });
      setMessageReceived('');
    }
  }, [table]);

  const updateTable = tableString => {
    try {
      const tableObject = JSON.parse(tableString);
      setTable({...tableObject});
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  const getRawArray = size => {
    let arr = [];
    for (let index = 0; index < size; index++) {
      arr.push({srno: index + 1});
    }
    return arr;
  };

  const getTopPlayerDeckSize = () => {
    if (table.playersCommons.length < 2) return 0;
    let otherPlayer;

    table.playersCommons.forEach(player => {
      if (player.id == getTopPlayerId()) {
        otherPlayer = player;
      }
    });
    return otherPlayer.deckSize;
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

  const getMyPlayer = () => {
    if (table.playersCommons.length < 2) return 0;
    let myPlayer;

    table.playersCommons.forEach(player => {
      if (player.name == userName) {
        myPlayer = player;
      }
    });
    return myPlayer;
  };

  const cardPlayed = card => {
    if (
      (card.cardType == 'WILD' || card.cardType == 'WILDDRAW4') &&
      card.colorType == null
    ) {
      setCard(card);
      setShowColorPicker(true);
    } else {
      stompClient.send(`/app/cardPlayed/${tableId}`, {}, JSON.stringify(card));
    }
  };

  const actionButton = action => {
    stompClient.send(`/app/${action}/${tableId}`, {}, {});
  };

  const colorChoosen = color => {
    let finalCard = {...card};
    finalCard.colorType = color.toUpperCase();
    setShowColorPicker(false);
    setCard();
    cardPlayed(finalCard);
  };

  const home = () => {
    setTableId();
  };

  const restartGame = () => {
    stompClient.send(`/app/restartGame/${tableId}`, {}, {});
  };

  if (table == undefined)
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, color: 'white'}}>
          waiting for others to join : {tableId}
        </Text>
      </View>
    );

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
      <View style={styles.topCardsStyle}>
        {getTopPlayer() == undefined ? (
          <Text style={{color: 'red'}}>error</Text>
        ) : getTopPlayer().deckSize > 0 ? (
          <ScrollView
            horizontal
            style={
              getTopPlayer().id == table.activePlayerIndex && styles.highLight
            }>
            {getRawArray(getTopPlayerDeckSize()).map((card, index) => {
              return <CardBacks key={index} index={index} place={'top'} />;
            })}
          </ScrollView>
        ) : (
          <ShowRank rank={getTopPlayer().rank} />
        )}
        <Text style={styles.playerName}>{getTopPlayer().name}</Text>
      </View>

      {/* showing self cards and buttons */}
      <View style={styles.myCardsStyle}>
        {showColorPicker && <ColorPicker colorChoosen={colorChoosen} />}
        {myIndex != undefined && myIndex == table.activePlayerIndex && (
          <Text style={{color: 'white', marginBottom: 5, fontSize: 15}}>
            Your turn
          </Text>
        )}
        <ActionButtons actionButton={actionButton} />

        <ScrollView
          horizontal
          style={
            getMyPlayer().id == table.activePlayerIndex && styles.highLight
          }>
          {myCards &&
            myCards.map((card, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => cardPlayed(card)}>
                  <Card card={card} key={index} index={index} />
                </TouchableOpacity>
              );
            })}
        </ScrollView>
        {myCards && myCards.length == 0 && (
          <ShowRank rank={getMyPlayer().rank} />
        )}
      </View>

      {/* shows left and right players */}
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
                  return (
                    <CardBacks key={index} index={index} place={'right'} />
                  );
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
  myCardsStyle: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  topCardsStyle: {
    position: 'absolute',
    top: 0,
  },
  message: {
    color: 'white',
    position: 'absolute',
    fontSize: 20,
    top: screenWidth - 200,
    zIndex: 12,
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
