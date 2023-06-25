import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import Svg from "react-native-svg";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { sum } from "lodash";
import * as Crypto from "expo-crypto";
import styled, { useTheme } from "styled-components";

import PieChartSegment from "./PieChartSegment";
import {
  getColorFromCategory,
  getLargeNumberAbbreviation,
} from "../../utils/helpers";
import { Category, CategoryProps } from "../../utils/types";
import { FlexCenterBox, Typography } from "../../utils/shared-styles";

const Wrapper = styled(FlexCenterBox)`
  padding: 20px 16px;
`;
const RelativeWrapper = styled(FlexCenterBox)`
  position: relative;
`;
const PieWrapper = styled(View)`
  width: 200px;
  height: 200px;
  transform: rotateZ(-90deg);
`;
const TotalAmount = styled(Typography)`
  position: absolute;
  color: ${({ theme }) => theme.neutral[100]};
`;
const CategoryCardsWrapper = styled(FlexCenterBox)`
  flex-direction: row;
  margin-top: 40px;
`;
const CategoryCard = styled(FlexCenterBox)`
  flex: 1;
  padding: 16px 0;
  margin: 0 2px;
  background-color: ${({ theme }) => theme.neutral[20]};
`;
const CategoryLabel = styled(Typography)<CategoryProps>`
  margin-bottom: 8px;
  color: ${({ theme, category }) => getColorFromCategory({ theme, category })};
`;
const CategoryAmount = styled(Typography)<CategoryProps>`
  color: ${({ theme, category }) => getColorFromCategory({ theme, category })};
`;

const PieChart: React.FC<{
  data: [number, number, number];
}> = ({ data }) => {
  const total = useMemo(() => sum(data), [data]);
  const percentages = useMemo(() => data.map((i) => i / total), [data, total]);

  const progress = useSharedValue(0);
  const [startAngles, setStartAngles] = useState<number[]>([]);
  useEffect(() => {
    const angles = percentages.reduce(
      (prev, curr) => {
        const angle = prev.at(-1)! + curr * 360;
        return [...prev, angle];
      },
      [0],
    );
    setStartAngles(angles);
    progress.value = 0;
    progress.value = withTiming(1, { duration: 1000 });
  }, [data, progress, percentages]);

  const theme = useTheme();

  return (
    <Wrapper>
      <RelativeWrapper>
        <PieWrapper>
          <Svg viewBox="0 0 200 200">
            {percentages.map((p, index) => {
              const colors = [
                theme.green[80],
                theme.orange[80],
                theme.neutral[40],
              ];

              return (
                <PieChartSegment
                  key={Crypto.randomUUID()}
                  angle={startAngles[index]}
                  percent={p}
                  progress={progress}
                  color={colors[index]}
                />
              );
            })}
          </Svg>
        </PieWrapper>
        <TotalAmount isNumber size="Headline/L">
          {getLargeNumberAbbreviation(total)}
        </TotalAmount>
      </RelativeWrapper>
      <CategoryCardsWrapper>
        {data.map((value, index) => {
          let category = Category.Uncategorized;
          if (index === 0) category = Category.MustHave;
          if (index === 1) category = Category.NiceToHave;
          return (
            <CategoryCard key={Crypto.randomUUID()}>
              <CategoryLabel category={category} size="Body/S">
                {category}
              </CategoryLabel>
              <CategoryAmount category={category} size="Body/M" isNumber>
                {getLargeNumberAbbreviation(value)}
              </CategoryAmount>
            </CategoryCard>
          );
        })}
      </CategoryCardsWrapper>
    </Wrapper>
  );
};

export default PieChart;
