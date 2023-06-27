import React, { useRef } from "react";
import { Animated, Text, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components";

import { useAppDispatch } from "../../store";
import { deleteTransaction } from "../../store/transactions.slice";

import { formatAmount, getColorFromCategory } from "../../utils/helpers";
import { CategoryProps, Transaction } from "../../utils/types";
import { Typography } from "../../utils/shared-styles";

const Amount = styled(Typography)<CategoryProps>`
  color: ${({ theme, category }) =>
    getColorFromCategory({
      theme,
      category,
      neutralShade: 70,
    })};
`;
const Tags = styled(Typography)`
  color: ${({ theme }) => theme.neutral[60]};
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
              color: theme.neutral[100],
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
        <MaterialIcons name="edit" size={24} color={theme.neutral[100]} />,
        "Edit",
        theme.neutral[20],
        160,
        progress,
      )}
      {renderRightButton(
        <MaterialIcons name="delete" size={24} color={theme.neutral[100]} />,
        "Delete",
        theme.red[80],
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
          neutralShade: 70,
        }),
        backgroundColor: theme.neutral[10],
      }}
    >
      <Amount size="Body/M" isNumber category={data.category}>
        {formatAmount(data.amount)}
      </Amount>
      <Tags size="Body/S">{data.tags.join(", ") || " "}</Tags>
    </Swipeable>
  );
};

export default TransactionItem;
