import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Provider store={store}>
          <HomeScreen />
        </Provider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
