import React from "react";
import { DateTime } from "luxon";
import styled from "styled-components";

import MonthChip from "./MonthChip";
import { FlexCenterBox } from "../../utils/shared-styles";

const Wrapper = styled(FlexCenterBox)`
  flex-direction: row;
  margin-bottom: 16px;
`;

const MonthChipFilters: React.FC<{
  selectedMonth: DateTime;
  onMonthChange: (month: DateTime) => void;
}> = ({ selectedMonth, onMonthChange }) => {
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
