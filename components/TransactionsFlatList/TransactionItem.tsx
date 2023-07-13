import React, { useRef } from "react";
import { Animated, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components";

import {
  formatAmount,
  getColorFromCategory,
  hexToRGBA,
} from "../../utils/helpers";
import { CategoryProps, Transaction } from "../../utils/types";
import {
  FlexCenterBox,
  Typography,
  flexCenter,
} from "../../utils/shared-styles";

const TagsWrapper = styled(FlexCenterBox)`
  flex-direction: row;
  flex: 1;
  justify-content: left;
  overflow: hidden;
`;
const Tag = styled(Typography)`
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 4px;
  color: ${({ theme }) => theme.neutral[100]};
  background-color: ${({ theme }) => hexToRGBA(theme.neutral[100], 0.08)};
`;
const Amount = styled(Typography)<CategoryProps>`
  color: ${({ theme, category }) =>
    getColorFromCategory({
      theme,
      category,
      neutralShade: 70,
    })};
  flex: 1;
  text-align: right;
`;
const RightButtonWrapper = styled(View)`
  width: 160px;
  flex-direction: row;
  margin-left: 16px;
`;
const RightButton = styled(RectButton)<{ color: string }>`
  ${flexCenter};
  flex: 1;
  background-color: ${({ color }) => color};
`;
const RightButtonText = styled(Typography)`
  margin-top: 4px;
  color: ${({ theme }) => theme.neutral[100]};
`;
const renderRightButton = (
  icon: React.ReactNode,
  text: string,
  color: string,
  x: number,
  progress: Animated.AnimatedInterpolation<number>,
  swipeableRef: React.RefObject<Swipeable>,
  callback: () => void,
) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });
  const pressHandler = () => {
    callback();
    swipeableRef.current?.close();
  };

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <RightButton onPress={pressHandler} color={color}>
        {icon}
        <RightButtonText size="Label/M">{text}</RightButtonText>
      </RightButton>
    </Animated.View>
  );
};

const TransactionItem: React.FC<{
  data: Transaction;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ data, onEdit, onDelete }) => {
  const theme = useTheme();

  const swipeableRef = useRef<Swipeable>(null);

  const renderRightButtons = (
    progress: Animated.AnimatedInterpolation<number>,
  ) => (
    <RightButtonWrapper>
      {renderRightButton(
        <MaterialIcons name="edit" size={24} color={theme.neutral[100]} />,
        "Edit",
        theme.neutral[20],
        160,
        progress,
        swipeableRef,
        onEdit,
      )}
      {renderRightButton(
        <MaterialIcons name="delete" size={24} color={theme.neutral[100]} />,
        "Delete",
        theme.red[30],
        80,
        progress,
        swipeableRef,
        onDelete,
      )}
    </RightButtonWrapper>
  );

  return (
    <Swipeable
      key={data.id}
      ref={swipeableRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={renderRightButtons}
      childrenContainerStyle={{
        paddingVertical: 16,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <TagsWrapper>
        {data.tags.map((t) => (
          <Tag key={t} size="Label/M">
            {t}
          </Tag>
        ))}
      </TagsWrapper>
      <Amount size="Body/M" isNumber category={data.category}>
        {formatAmount(data.amount)}
      </Amount>
    </Swipeable>
  );
};

export default TransactionItem;
