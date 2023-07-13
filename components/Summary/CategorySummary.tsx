import React from "react";
import styled from "styled-components";

import { Category, CategoryProps } from "../../utils/types";
import { getLargeNumberAbbreviation } from "../../utils/helpers";
import { FlexCenterBox, Typography } from "../../utils/shared-styles";
import CategoryChip from "../@common/CategoryChip";

const CategoryCard = styled(FlexCenterBox)`
  flex: 1;
`;
const CategoryAmount = styled(Typography)<CategoryProps>`
  color: ${({ theme }) => theme.neutral[100]};
  margin-bottom: 20px;
`;

const CategorySummary: React.FC<{ value: number; category: Category }> = ({
  value,
  category,
}) => (
  <CategoryCard>
    <CategoryAmount category={category} size="Title/M" isNumber>
      {getLargeNumberAbbreviation(value)}
    </CategoryAmount>
    <CategoryChip category={category} />
  </CategoryCard>
);

export default CategorySummary;
