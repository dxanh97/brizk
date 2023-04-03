import React from "react";
import { View } from "react-native";
import { DateTime } from "luxon";
import styled from "styled-components";

import MonthChip from "./MonthChip";

const Wrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

interface Props {
  selectedMonth: DateTime;
  onMonthChange: (month: DateTime) => void;
}

const MonthChipFilters: React.FC<Props> = ({
  selectedMonth,
  onMonthChange,
}) => {
  const prevMonth = selectedMonth.minus({ months: 1 });
  const nextMonth = selectedMonth.plus({ months: 1 });
  return (
    <Wrapper>
      <MonthChip data={prevMonth} onPress={() => onMonthChange(prevMonth)} />
      <MonthChip data={selectedMonth} isActive />
      <MonthChip data={nextMonth} onPress={() => onMonthChange(nextMonth)} />
    </Wrapper>
  );
};

export default MonthChipFilters;
