import React, { useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { DateTime } from "luxon";
import { MaterialIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components";

import MonthChipFilters from "../components/@common/MonthChipFilters";
import Summary from "../components/summary";
import TransactionsFlatList from "../components/TransactionsFlatList";
import UpsertTransactionBottomSheet from "../components/UpsertTransactionBottomSheet";

const { width } = Dimensions.get("window");
const viewWidth = width - 32;
const Wrapper = styled(View)`
  flex: 1;
  position: relative;
  padding: 0 16px;
`;
const ViewWrapper = styled(View)`
  width: ${viewWidth}px;
  padding-top: 16px;
`;
const HeaderWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 68px;
`;
const Header = styled(Text)`
  font-family: "DM Sans";
  font-size: 22px;
  line-height: 28px;
  color: ${({ theme }) => theme.neutral.get(13)};
`;
const ChevronButtonsWrapper = styled(View)`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
`;
const PrevButton = styled(Pressable)`
  position: absolute;
  left: 0;
`;
const NextButton = styled(Pressable)`
  position: absolute;
  right: 0;
`;
const MonthChipFiltersWrapper = styled(View)`
  position: absolute;
  top: 68px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const BottomButtonsWrapper = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;
const StyledButton = styled(Pressable)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const StyledButtonLabel = styled(Text)`
  font-family: "DM Sans";
  color: ${({ theme }) => theme.neutral.get(6)};
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
`;

const App: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    DateTime.now().startOf("month"),
  );

  const scrollViewRef = useRef<ScrollView>(null);

  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const theme = useTheme();
  return (
    <Wrapper>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        decelerationRate="fast"
        snapToInterval={viewWidth}
        snapToAlignment="center"
      >
        <ViewWrapper>
          <HeaderWrapper>
            <Header>Spending</Header>
          </HeaderWrapper>
          <Summary selectedMonth={selectedMonth} />
        </ViewWrapper>
        <ViewWrapper>
          <HeaderWrapper>
            <Header>History</Header>
          </HeaderWrapper>
          <TransactionsFlatList selectedMonth={selectedMonth} />
        </ViewWrapper>
      </ScrollView>
      <ChevronButtonsWrapper>
        <PrevButton
          onPress={() => {
            scrollViewRef.current?.scrollTo({ x: 0 });
          }}
        >
          <MaterialIcons
            name="chevron-left"
            size={24}
            color={theme.neutral.get(13)}
          />
        </PrevButton>
        <NextButton
          onPress={() => {
            scrollViewRef.current?.scrollTo({ x: width });
          }}
        >
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={theme.neutral.get(13)}
          />
        </NextButton>
      </ChevronButtonsWrapper>
      <MonthChipFiltersWrapper>
        <MonthChipFilters
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </MonthChipFiltersWrapper>
      <BottomButtonsWrapper>
        <StyledButton>
          <MaterialIcons
            name="add-circle"
            size={24}
            color={theme.neutral.get(6)}
            onPress={() => setOpenBottomSheet(true)}
          />
          <StyledButtonLabel>New</StyledButtonLabel>
        </StyledButton>
        <StyledButton>
          <MaterialIcons
            name="content-copy"
            size={24}
            color={theme.neutral.get(6)}
          />
          <StyledButtonLabel>Categorize</StyledButtonLabel>
        </StyledButton>
      </BottomButtonsWrapper>
      <UpsertTransactionBottomSheet
        open={openBottomSheet}
        onClose={() => setOpenBottomSheet(false)}
      />
    </Wrapper>
  );
};

export default App;
