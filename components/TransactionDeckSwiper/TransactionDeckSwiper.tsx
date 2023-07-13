import React, { useMemo, useRef, useState } from "react";
import { View } from "react-native";
import * as Crypto from "expo-crypto";
import Swiper from "react-native-deck-swiper";
import { useTheme } from "styled-components";

import { useAppDispatch, useAppSelector } from "../../store";
import { selectTransactionsByIds } from "../../store/transactions.selectors";
import {
  addTransactions,
  updateTransaction,
} from "../../store/transactions.slice";

import { Category, Transaction } from "../../utils/types";

import TransactionCard, { ForwardedRef } from "./TransactionCard";

const { MustHave, NiceToHave, Uncategorized } = Category;

interface Props {
  transactionIds: Array<Transaction["id"]>;
  onSwipedAll: () => void;
}

const TransactionDeckSwiper: React.FC<Props> = ({
  transactionIds,
  onSwipedAll,
}) => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((s) =>
    selectTransactionsByIds(s, transactionIds),
  );
  const cardsPlaceholder = useMemo(() => {
    if (transactions.length === 0) {
      return new Array(1000).fill(0);
    }
    return transactions;
  }, [transactions]);

  const theme = useTheme();
  const [selectingCategory, setSelectingCategory] = useState<Category>();
  const topCardRef = useRef<ForwardedRef>(null);
  const resetSelectingCategory = () => {
    setSelectingCategory(undefined);
  };

  const handleOnSwiping = (x: number, y: number) => {
    if (x <= -10) {
      setSelectingCategory(MustHave);
    }
    if (x > -10 && x < 10) {
      if (y < -10) {
        setSelectingCategory(Uncategorized);
      } else {
        resetSelectingCategory();
      }
    }
    if (x >= 10) {
      setSelectingCategory(NiceToHave);
    }
  };

  const [onTopIndex, setOnTopIndex] = useState(0);
  const handleOnSwiped = (cardIndex: number) => {
    if (!selectingCategory) {
      return;
    }

    const existingTransaction = transactions[cardIndex];
    const amount = topCardRef.current?.getAmount() || 0;
    const tags = topCardRef.current?.getTags() || [];
    const transaction: Transaction = {
      id: existingTransaction?.id ?? Crypto.randomUUID(),
      amount,
      tags,
      timestamp: new Date().getTime(),
      category: selectingCategory ?? Category.Uncategorized,
    };
    if (!existingTransaction) {
      dispatch(addTransactions([transaction]));
    } else {
      dispatch(updateTransaction(transaction));
    }

    setOnTopIndex(cardIndex + 1);
    resetSelectingCategory();

    if (cardIndex === cardsPlaceholder.length - 1) {
      onSwipedAll();
    }
  };

  return (
    <View>
      <Swiper
        stackSize={2}
        cards={cardsPlaceholder}
        animateCardOpacity
        animateOverlayLabelsOpacity
        onSwiping={handleOnSwiping}
        overlayOpacityVerticalThreshold={10}
        overlayOpacityHorizontalThreshold={10}
        backgroundColor={theme.neutral[10]}
        onSwipedAborted={resetSelectingCategory}
        onSwiped={handleOnSwiped}
        renderCard={(data: Transaction | 0, index) => {
          const isOnTop = onTopIndex === index;
          const isNew = data === 0;

          return (
            <TransactionCard
              ref={isOnTop ? topCardRef : null}
              onTopOfDeck={isOnTop}
              amount={isNew ? undefined : data.amount}
              tags={isNew ? [] : data.tags}
              category={isNew ? Category.Uncategorized : data.category}
              selectingCategory={selectingCategory}
            />
          );
        }}
      />
    </View>
  );
};

export default TransactionDeckSwiper;
