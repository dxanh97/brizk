import React, { useState } from "react";
import { View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { useTheme } from "styled-components";

import { Category, MustHave, NiceToHave } from "../../utils/types";

import TransactionCard from "./TransactionCard";

const TransactionDeckSwiper: React.FC = () => {
  const theme = useTheme();
  const [selectingCategory, setSelectingCategory] = useState<Category>();
  const resetSelectingCategory = () => setSelectingCategory(undefined);

  const [, setTransaction] = useState("");
  const handleOnSwiping = (x: number) => {
    if (x <= -10) {
      setSelectingCategory(MustHave);
    }
    if (x > -10 && x < 10) {
      resetSelectingCategory();
    }
    if (x >= 10) {
      setSelectingCategory(NiceToHave);
    }
  };

  return (
    <View>
      <Swiper
        cards={[0, 1]}
        backgroundColor={theme.neutral.get(2)}
        stackSize={2}
        infinite
        animateCardOpacity
        animateOverlayLabelsOpacity
        overlayOpacityHorizontalThreshold={10}
        overlayOpacityVerticalThreshold={10}
        onSwiping={handleOnSwiping}
        onSwipedAborted={resetSelectingCategory}
        onSwiped={resetSelectingCategory}
        renderCard={() => (
          <TransactionCard
            // TODO: update logic on top
            onTopOfDeck
            selectingCategory={selectingCategory}
            onAmountChange={setTransaction}
          />
        )}
      />
    </View>
  );
};

export default TransactionDeckSwiper;
