import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';
import TransactionDeck from '../components/TransactionDeck';
import TransactionList from '../components/TransactionList';
import { useDispatch } from '../redux/store';
import { addTransaction } from '../redux/transaction-slice';

const HomeScreen: React.FC = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TransactionList />
      <Button
        title="New"
        onPress={() => {
          dispatch(
            addTransaction({
              amount: 3000000,
              timestamp: new Date().getTime(),
              tagIds: [],
              newTags: ['test', 'okey'],
            }),
          );
        }}
      />
      <Button title="Revise" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <TransactionDeck onDismissModal={() => setOpen(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
