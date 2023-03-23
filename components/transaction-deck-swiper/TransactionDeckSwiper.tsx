import React, { useRef, useState } from "react";
import { View } from "react-native";
import * as Crypto from "expo-crypto";
import Swiper from "react-native-deck-swiper";
import { useTheme } from "styled-components";

import { useAppDispatch } from "../../store";
import { addTransaction } from "../../store/transaction.slice";

import { Category, MustHave, NiceToHave, Transaction } from "../../utils/types";

import TransactionCard, { ForwardedRef } from "./TransactionCard";

const cardsPlaceholder = new Array(1000).fill(0);

const TransactionDeckSwiper: React.FC = () => {
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const [selectingCategory, setSelectingCategory] = useState<Category>();
  const topCardRef = useRef<ForwardedRef>(null);
  const resetSelectingCategory = () => {
    setSelectingCategory(undefined);
  };

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

  const [onTopIndex, setOnTopIndex] = useState(0);
  const handleOnSwiped = (cardIndex: number) => {
    const amount = topCardRef.current?.getAmount() || 0;
    const transaction: Transaction = {
      id: Crypto.randomUUID(),
      amount,
      tags: [],
      timestamp: new Date().getTime(),
      category: selectingCategory,
    };
    dispatch(addTransaction(transaction));

    setOnTopIndex(cardIndex + 1);
    resetSelectingCategory();
  };

  return (
    <View>
      <Swiper
        infinite
        stackSize={2}
        cards={cardsPlaceholder}
        animateCardOpacity
        animateOverlayLabelsOpacity
        onSwiping={handleOnSwiping}
        overlayOpacityVerticalThreshold={10}
        overlayOpacityHorizontalThreshold={10}
        backgroundColor={theme.neutral.get(2)}
        onSwipedAborted={resetSelectingCategory}
        onSwiped={handleOnSwiped}
        renderCard={(_, index) => {
          const isOnTop = onTopIndex === index;
          return (
            <TransactionCard
              ref={isOnTop ? topCardRef : null}
              onTopOfDeck={isOnTop}
              selectingCategory={selectingCategory}
            />
          );
        }}
      />
    </View>
  );
};

export default TransactionDeckSwiper;
