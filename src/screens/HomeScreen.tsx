import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { BottomSheet, Typography } from '../components/common';
import Instructions from '../components/core/edit-transaction/Instructions';

const HomeScreen: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <Button onPress={() => setOpen(true)} title="Present Modal" />
      <BottomSheet open={open} onClose={() => setOpen(false)}>
        <Typography>Awesome 🎉</Typography>
        <Instructions />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    height: '100%',
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#141414',
  },
});

export default HomeScreen;
