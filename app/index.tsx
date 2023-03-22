/* eslint-disable global-require */
import React, { useState } from "react";
import { Provider } from "react-redux";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styled, { ThemeProvider } from "styled-components";

import store from "../store";
import _theme from "../utils/theme";

import AddTransactionBottomSheet from "../components/AddTransactionBottomSheet";
import AppBar from "../components/AppBar";

const AppWrapper = styled(View)<{ insetTop: number }>`
  background-color: ${({ theme }) => theme.neutral.get(1)};
  flex: 1;
  padding-top: ${(props) => props.insetTop}px;
`;
const StyledGestureHandlerRootView = styled(GestureHandlerRootView)`
  flex: 1;
`;

const AppContent: React.FC = () => {
  const [fontLoaded] = useFonts({
    "DM Mono": require("../assets/fonts/DM-Mono.ttf"),
    "DM Sans": require("../assets/fonts/DM-Sans.ttf"),
    "PT Mono": require("../assets/fonts/PT-Mono.ttf"),
  });
  const { top: insetTop } = useSafeAreaInsets();
  const [openAddTransaction, setOpenAddTransaction] = useState(true);

  if (!fontLoaded) return null;
  return (
    <AppWrapper insetTop={insetTop}>
      <StatusBar style="inverted" />
      <AppBar />
      <StyledGestureHandlerRootView>
        <AddTransactionBottomSheet
          open={openAddTransaction}
          onClose={() => setOpenAddTransaction(false)}
        />
      </StyledGestureHandlerRootView>
    </AppWrapper>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={_theme}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
