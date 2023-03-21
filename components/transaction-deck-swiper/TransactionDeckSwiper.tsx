import React from "react";
import { View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { useTheme } from "styled-components";

import TransactionCard from "./TransactionCard";

const TransactionDeckSwiper: React.FC = () => {
  const theme = useTheme();

  return (
    <View>
      <Swiper
        cards={[0, 0, 0, 0]}
        renderCard={(_, index) => (
          <TransactionCard onTopOfDeck={index % 2 === 0} />
        )}
        backgroundColor={theme.neutral.get(2)}
        cardIndex={0}
        stackSize={2}
      />
    </View>
  );
};

export default TransactionDeckSwiper;
