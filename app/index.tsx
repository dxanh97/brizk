import React, { useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { DateTime } from "luxon";
import { MaterialIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components";

import Summary from "../components/Summary";
import MonthChipFilters from "../components/@common/MonthChipFilters";
import TransactionsFlatList from "../components/TransactionsFlatList/TransactionsFlatlist";

const { width } = Dimensions.get("window");
const viewWidth = width - 32;
const Wrapper = styled(View)`
  flex: 1;
  position: relative;
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
const ButtonsWrapper = styled(View)`
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
  justify-content: center;
  align-items: center;
`;

const App: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    DateTime.now().startOf("month"),
  );

  const scrollViewRef = useRef<ScrollView>(null);

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
      <ButtonsWrapper>
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
      </ButtonsWrapper>
      <MonthChipFiltersWrapper>
        <MonthChipFilters
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </MonthChipFiltersWrapper>
    </Wrapper>
  );
};

export default App;
