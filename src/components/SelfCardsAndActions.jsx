import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ShowRank} from './ShowRank';
import {ChallengeOptions} from './ChallengeOptions';
import {ActionButtons} from './ActionButtons';
import {Card} from './Card';
import {ColorPicker} from './ColorPicker';

export const SelfCardsAndActions = ({
  table,
  userName,
  stompClient,
  myCards,
}) => {
  const [myIndex, setMyIndex] = useState();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showChallengeOptions, setShowChallengeOptions] = useState(false);
  const [card, setCard] = useState();

  useEffect(() => {
    if (table) {
      const players = table.playersCommons;
      players.forEach(player => {
        if (player.name == userName) {
          setMyIndex(player.id);
          if (player.id == table.activePlayerIndex && table.challengeActive) {
            setShowChallengeOptions(true);
          } else {
            setShowChallengeOptions(false);
          }
        }
      });
    }
  }, [table]);

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
      stompClient.send(
        `/app/cardPlayed/${table.tableId}`,
        {},
        JSON.stringify(card),
      );
    }
  };

  const actionButton = action => {
    stompClient.send(`/app/${action}/${table.tableId}`, {}, {});
  };

  const colorChoosen = color => {
    let finalCard = {...card};
    finalCard.colorType = color.toUpperCase();
    setShowColorPicker(false);
    setCard();
    cardPlayed(finalCard);
  };

  const challengeDraw4 = () => {
    stompClient.send(`/app/challengeDraw4/${table.tableId}`, {}, {});
  };

  const draw4Cards = () => {
    stompClient.send(`/app/draw4Cards/${table.tableId}`, {}, {});
  };

  return (
    <View style={styles.myCardsStyle}>
      {showColorPicker && <ColorPicker colorChoosen={colorChoosen} />}
      {showChallengeOptions && (
        <ChallengeOptions
          challenge={challengeDraw4}
          drawCards={draw4Cards}
          previousColor={table.previousColor}
        />
      )}
      {myIndex != undefined && myIndex == table.activePlayerIndex && (
        <Text style={{color: 'white', marginBottom: 5, fontSize: 15}}>
          Your turn
        </Text>
      )}
      {!showChallengeOptions && <ActionButtons actionButton={actionButton} />}

      <ScrollView
        horizontal
        style={getMyPlayer().id == table.activePlayerIndex && styles.highLight}>
        {myCards &&
          myCards.map((card, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => cardPlayed(card)}>
                <Card card={card} key={index} index={index} />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      {myCards && myCards.length == 0 && <ShowRank rank={getMyPlayer().rank} />}
    </View>
  );
};

const styles = StyleSheet.create({
  myCardsStyle: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  highLight: {
    borderColor: 'lime',
    borderWidth: 5,
    borderRadius: 15,
  },
});
