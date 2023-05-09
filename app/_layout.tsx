/* eslint-disable global-require */
import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import styled, { ThemeProvider } from "styled-components";

import store, { persistor } from "../store";
import defaultTheme from "../utils/theme";
import { Font } from "../utils/types";

import AppBar from "../components/AppBar";

const AppWrapper = styled(View)<{ insetTop: number }>`
  flex: 1;
  background-color: ${({ theme }) => theme.neutral.get(1)};
  padding: ${(props) => props.insetTop}px 0 0;
`;
const StyledGestureHandlerRootView = styled(GestureHandlerRootView)`
  flex: 1;
`;

const Layout: React.FC = () => {
  const [fontLoaded] = useFonts({
    [Font.DM_MONO]: require("../assets/fonts/DM-Mono.ttf"),
    [Font.DM_SANS]: require("../assets/fonts/DM-Sans.ttf"),
    [Font.PT_MONO]: require("../assets/fonts/PT-Mono.ttf"),
  });
  const { top: insetTop } = useSafeAreaInsets();

  if (!fontLoaded) return null;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          <SafeAreaProvider>
            <AppWrapper insetTop={insetTop}>
              <StatusBar style="inverted" />
              <AppBar />
              <StyledGestureHandlerRootView>
                <Slot />
              </StyledGestureHandlerRootView>
            </AppWrapper>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Layout;
