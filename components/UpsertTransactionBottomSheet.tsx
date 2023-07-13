import React, { useRef } from "react";
import { Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import styled, { useTheme } from "styled-components";

import TransactionDeckSwiper from "./TransactionDeckSwiper";

import { FlexCenterBox, Typography } from "../utils/shared-styles";
import { Transaction } from "../utils/types";

const Wrapper = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const DeckWrapper = styled(View)`
  flex: 1;
`;
const Header = styled(FlexCenterBox)`
  flex-direction: row;
  position: relative;
  padding: 20px;
`;
const Title = styled(Typography)`
  color: ${({ theme }) => theme.neutral[100]};
`;
const CloseButton = styled(Pressable)`
  position: absolute;
  right: 16px;
`;

const UpsertTransactionBottomSheet: React.FC<{
  open: boolean;
  transactionIds: Array<Transaction["id"]>;
  onClose: () => void;
}> = ({ open, transactionIds, onClose }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useTheme();

  if (!open) return null;
  return (
    <Wrapper>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={["100%"]}
        enablePanDownToClose
        onClose={onClose}
        backgroundStyle={{
          backgroundColor: theme.neutral[10],
          borderRadius: 0,
        }}
        handleComponent={null}
      >
        <DeckWrapper>
          <Header>
            <Title size="Title/M">
              {transactionIds.length > 0
                ? "Edit Transaction"
                : "New Transaction"}
            </Title>
            <CloseButton onPress={() => bottomSheetRef.current?.close()}>
              <MaterialIcons
                name="close"
                size={24}
                color={theme.neutral[100]}
              />
            </CloseButton>
          </Header>
          <TransactionDeckSwiper
            transactionIds={transactionIds}
            onSwipedAll={onClose}
          />
        </DeckWrapper>
      </BottomSheet>
    </Wrapper>
  );
};

export default UpsertTransactionBottomSheet;
