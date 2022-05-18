import React from 'react';
import {
  SafeAreaView,
  // ScrollView,
  StatusBar,
  StyleSheet,
  // Text,
  // View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <SafeAreaView>
        <StatusBar />
        <Provider store={store}>
          <HomeScreen />
        </Provider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default App;
