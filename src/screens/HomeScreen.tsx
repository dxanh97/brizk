import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';
import TransactionDeck from '../components/TransactionDeck';

const HomeScreen: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Button title="New" onPress={() => setOpen(true)} />
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
