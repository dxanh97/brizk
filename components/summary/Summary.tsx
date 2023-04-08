import React, { useState } from "react";
import { View } from "react-native";
import { DateTime } from "luxon";
import styled from "styled-components";

import { useAppSelector } from "../../store";
import { selectMonthlySummary } from "../../store/transactions.selectors";

import { getMonthAndYear } from "../../utils/helpers";

import MonthChipFilters from "../@common/MonthChipFilters";
import PieChart from "./PieChart";
import TransactionsFlatList from "../TransactionsFlatList/TransactionsFlatlist";

const Wrapper = styled(View)`
  flex: 1;
`;

const Summary: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    DateTime.now().startOf("month"),
  );
  const milliseconds = getMonthAndYear(selectedMonth.toMillis());
  const monthlySummary = useAppSelector((s) =>
    selectMonthlySummary(s, milliseconds),
  );

  const { mustHave, niceToHave, uncategorized } = monthlySummary;
  return (
    <Wrapper>
      <MonthChipFilters
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />

      <PieChart data={[mustHave, niceToHave, uncategorized]} />

      <TransactionsFlatList selectedMonth={selectedMonth} />
    </Wrapper>
  );
};

export default Summary;
