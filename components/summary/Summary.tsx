import React from "react";
import { View } from "react-native";
import { DateTime } from "luxon";
import styled from "styled-components";

import { useAppSelector } from "../../store";
import { selectMonthlySummary } from "../../store/transactions.selectors";

import { getMonthAndYear } from "../../utils/helpers";

import PieChart from "./PieChart";

const Wrapper = styled(View)`
  flex: 1;
`;

const Summary: React.FC<{
  selectedMonth: DateTime;
}> = ({ selectedMonth }) => {
  const milliseconds = getMonthAndYear(selectedMonth.toMillis());
  const { mustHave, niceToHave, uncategorized } = useAppSelector((s) =>
    selectMonthlySummary(s, milliseconds),
  );

  return (
    <Wrapper>
      <PieChart data={[mustHave, niceToHave, uncategorized]} />
    </Wrapper>
  );
};

export default Summary;
