import React, { useRef } from "react";
import { Animated, Text, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components";

import { formatAmount, getColorFromCategory } from "../../utils/helpers";
import { CategoryProps, Transaction } from "../../utils/types";
import { useAppDispatch } from "../../store";
import { deleteTransaction } from "../../store/transactions.slice";

const Amount = styled(Text)<CategoryProps>`
  font-family: "PT Mono";
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme, category }) =>
    getColorFromCategory({
      theme,
      category,
      neutralShade: 8,
    })};
`;
const Tags = styled(Text)`
  font-family: "DM Sans";
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.neutral.get(7)};
`;

const TransactionItem: React.FC<{
  data: Transaction;
}> = ({ data }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const swipeableRef = useRef<Swipeable>(null);
  const renderRightButton = (
    icon: React.ReactNode,
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>,
    callback?: () => void,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      callback?.();
      swipeableRef.current?.close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={{
            backgroundColor: color,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={pressHandler}
        >
          {icon}
          <Text
            style={{
              fontFamily: "DM Sans",
              fontSize: 12,
              lineHeight: 16,
              color: theme.neutral.get(13),
              marginTop: 8,
            }}
          >
            {text}
          </Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightButtons = (
    progress: Animated.AnimatedInterpolation<number>,
  ) => (
    <View
      style={{
        width: 160,
        flexDirection: "row",
        marginRight: -4,
      }}
    >
      {renderRightButton(
        <MaterialIcons name="edit" size={24} color={theme.neutral.get(13)} />,
        "Edit",
        theme.neutral.get(3)!,
        160,
        progress,
      )}
      {renderRightButton(
        <MaterialIcons name="delete" size={24} color={theme.neutral.get(13)} />,
        "Delete",
        theme.red,
        80,
        progress,
        () => dispatch(deleteTransaction(data.id)),
      )}
    </View>
  );

  return (
    <Swipeable
      key={data.id}
      ref={swipeableRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={renderRightButtons}
      containerStyle={{
        padding: 16,
        borderRadius: 4,
        marginBottom: 8,
        borderRightWidth: 4,
        borderRightColor: getColorFromCategory({
          theme,
          category: data.category,
          neutralShade: 8,
        }),
        backgroundColor: theme.neutral.get(2),
      }}
    >
      <Amount category={data.category}>{formatAmount(data.amount)}</Amount>
      <Tags>{data.tags.join(", ") || " "}</Tags>
    </Swipeable>
  );
};

export default TransactionItem;
