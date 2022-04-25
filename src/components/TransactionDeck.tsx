import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});

interface Props {
  onDismissModal: () => void;
}

const TransactionDeck: React.FC<Props> = ({ onDismissModal }) => {
  return (
    <View style={styles.container}>
      <Text>What</Text>
      <Swiper
        cards={['DO']}
        renderCard={(card) => {
          return (
            <View style={styles.card}>
              <Text style={styles.text}>{card}</Text>
            </View>
          );
        }}
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
        }}
        onSwipedAll={() => {
          console.log('onSwipedAll');
        }}
        cardIndex={0}
        stackSize={3}
        onSwipedBottom={onDismissModal}
      >
        <Button
          onPress={() => {
            console.log('oulala');
          }}
          title="Press me"
        >
          You can press me
        </Button>
      </Swiper>
    </View>
  );
};

export default TransactionDeck;
