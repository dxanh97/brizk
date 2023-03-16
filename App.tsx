import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AddTransactionBottomSheet from "./components/AddTransactionBottomSheet";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <GestureHandlerRootView style={styles.container}>
      <AddTransactionBottomSheet />
    </GestureHandlerRootView>
  </SafeAreaView>
);

export default App;
