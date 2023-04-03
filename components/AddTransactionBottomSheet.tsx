import React, { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import styled, { useTheme } from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";

import TransactionDeckSwiper from "./TransactionDeckSwiper";

const Wrapper = styled(View)`
  flex: 1;
  padding: 24px;
`;
const DeckWrapper = styled(View)`
  flex: 1;
`;
const Header = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
`;
const Title = styled(Text)`
  font-family: "DM Sans";
  font-size: 24px;
  line-height: 36px;
  color: ${({ theme }) => theme.neutral.get(13)};
`;
const CloseButton = styled(Pressable)`
  position: absolute;
  right: 16px;
`;

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddTransactionBottomSheet: React.FC<Props> = ({ open, onClose }) => {
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
            <Title>New Transaction</Title>
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

export default AddTransactionBottomSheet;
