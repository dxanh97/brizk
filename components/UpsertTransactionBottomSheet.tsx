import React, { useRef } from "react";
import { Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import styled, { useTheme } from "styled-components";

import TransactionDeckSwiper from "./TransactionDeckSwiper";

import { FlexCenterBox, Typography } from "../utils/shared-styles";

const Wrapper = styled(View)`
  /* padding: 24px; */
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
  color: ${({ theme }) => theme.neutral.get(13)};
`;
const CloseButton = styled(Pressable)`
  position: absolute;
  right: 16px;
`;

const UpsertTransactionBottomSheet: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
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
          backgroundColor: theme.neutral.get(2),
          borderRadius: 0,
        }}
        handleComponent={null}
      >
        <DeckWrapper>
          <Header>
            <Title size="Title/M">New Transaction</Title>
            <CloseButton onPress={() => bottomSheetRef.current?.close()}>
              <MaterialIcons
                name="close"
                size={24}
                color={theme.neutral.get(13)}
              />
            </CloseButton>
          </Header>
          <TransactionDeckSwiper />
        </DeckWrapper>
      </BottomSheet>
    </Wrapper>
  );
};

export default UpsertTransactionBottomSheet;
