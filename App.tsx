/* eslint-disable global-require */
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styled, { ThemeProvider } from "styled-components";

import AddTransactionBottomSheet from "./components/AddTransactionBottomSheet";
import AppBar from "./components/AppBar";

import theme from "./utils/theme";

const AppWrapper = styled(SafeAreaView)`
  background-color: ${(props) => props.theme.background};
  flex: 1;
`;
const StyledGestureHandlerRootView = styled(GestureHandlerRootView)`
  flex: 1;
`;

const App: React.FC = () => {
  const [fontLoaded] = useFonts({
    "DM-Mono": require("./assets/fonts/DM-Mono.ttf"),
    "DM-Sans": require("./assets/fonts/DM-Sans.ttf"),
    "PT-Mono": require("./assets/fonts/PT-Mono.ttf"),
  });

  const [openAddTransaction, setOpenAddTransaction] = useState(false);

  if (!fontLoaded) return null;
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <StatusBar style="inverted" />
        <AppBar />
        <StyledGestureHandlerRootView>
          <AddTransactionBottomSheet
            open={openAddTransaction}
            onClose={() => setOpenAddTransaction(false)}
          />
        </StyledGestureHandlerRootView>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
