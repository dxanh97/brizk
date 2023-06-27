import React from "react";
import { View } from "react-native";
import { DateTime } from "luxon";
import styled from "styled-components";

import { useAppSelector } from "../../store";
import { selectMonthlySummary } from "../../store/transactions.selectors";

import PieChart from "./PieChart";
import CategorySummary from "./CategorySummary";

import { getMonthAndYear } from "../../utils/helpers";
import { FlexCenterBox } from "../../utils/shared-styles";
import { Category } from "../../utils/types";

const Wrapper = styled(View)`
  flex: 1;
`;
const CategoryCardsWrapper = styled(FlexCenterBox)`
  flex-direction: row;
  margin-top: 60px;
`;

const { MustHave, NiceToHave, Uncategorized } = Category;

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
      <CategoryCardsWrapper>
        <CategorySummary value={mustHave} category={MustHave} />
        <CategorySummary value={niceToHave} category={NiceToHave} />
        <CategorySummary value={uncategorized} category={Uncategorized} />
      </CategoryCardsWrapper>
    </Wrapper>
  );
};

export default Summary;
