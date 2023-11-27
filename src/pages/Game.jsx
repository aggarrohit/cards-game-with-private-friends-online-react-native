import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  ToastAndroid,
} from 'react-native';
import {useUser} from '../state/UserContext';
import {Card} from '../components/Card';
import {CardBacks} from '../components/CardBacks';
import {ColorPicker} from '../components/ColorPicker';
import {ActiveCardAndColor} from '../components/ActiveCardAndColor';
import {ActionButtons} from '../components/ActionButtons';
import {ShowRank} from '../components/ShowRank';
import {GameCompleted} from '../components/GameCompleted';

export const Game = ({tableId, setTableId}) => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  const {stompClient, userName} = useUser();
  const [table, setTable] = useState();
  const [myIndex, setMyIndex] = useState();
  const [myCards, setMyCards] = useState();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [card, setCard] = useState();

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe(
        `/user/${userName}/queue/private-message`,
        function (message) {
          console.log('received message in personal : ' + message.body);
          if (Platform.OS == 'android') {
            ToastAndroid.show(
              message.body,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else {
            alert(message.body);
          }
        },
      );

      stompClient.subscribe(
        `/user/${userName}/queue/my-cards`,
        function (message) {
          console.log('received message in personal my-cards: ' + message.body);
          updateCards(message.body);
        },
      );

      stompClient.subscribe(
        `/table/${tableId}/table-updates`,
        function (tableMessage) {
          console.log('received table  update : ' + tableMessage.body);
          updateTable(tableMessage.body);
        },
      );

      stompClient.subscribe(`/table/${tableId}`, function (tableMessage) {
        console.log('received message in table : ' + tableMessage.body);
      });
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
    }
  }, [table]);

  const updateTable = tableString => {
    try {
      console.log('tableString : ' + tableString);
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
      if (player.name != userName) {
        otherPlayer = player;
      }
    });
    return otherPlayer.deckSize;
  };

  const getTopPlayer = () => {
    if (table.playersCommons.length < 2) return 0;
    let otherPlayer;

    table.playersCommons.forEach(player => {
      if (player.name != userName) {
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
      <ActiveCardAndColor table={table} />
      <View style={styles.topCardsStyle}>
        {getTopPlayer().deckSize > 0 ? (
          <ScrollView horizontal>
            {getRawArray(getTopPlayerDeckSize()).map((card, index) => {
              return <CardBacks key={index} index={index} place={'top'} />;
            })}
          </ScrollView>
        ) : (
          <ShowRank rank={getTopPlayer().rank} />
        )}
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
          }}>
          {getTopPlayer().name}
        </Text>
      </View>

      <View style={styles.myCardsStyle}>
        {showColorPicker && <ColorPicker colorChoosen={colorChoosen} />}
        {myIndex != undefined && myIndex == table.activePlayerIndex && (
          <Text style={{color: 'white', marginBottom: 5, fontSize: 15}}>
            Your turn
          </Text>
        )}
        <ActionButtons actionButton={actionButton} />

        <ScrollView horizontal>
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

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          // backgroundColor: 'red',
          width: screenWidth,
        }}>
        <View>
          <ScrollView>
            {getRawArray(2).map((card, index) => {
              return <CardBacks key={index} index={index} place={'left'} />;
            })}
          </ScrollView>
        </View>
        <View>
          <ScrollView>
            {getRawArray(getTopPlayerDeckSize()).map((card, index) => {
              return <CardBacks key={index} index={index} place={'right'} />;
            })}
          </ScrollView>
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
});
