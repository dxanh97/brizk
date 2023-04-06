import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
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

const Wrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RelativeWrapper = styled(View)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PieWrapper = styled(View)`
  width: 200px;
  height: 200px;
  transform: rotateZ(-90deg);
`;
const TotalAmount = styled(Text)`
  position: absolute;
  color: ${({ theme }) => theme.neutral.get(13)};
  font-family: "PT Mono";
  font-size: 36px;
`;
const CategoryCardsWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 40px;
`;
const CategoryCard = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 16px 0;
  margin: 0 2px;
  background-color: ${({ theme }) => theme.neutral.get(3)};
`;
const CategoryLabel = styled(Text)<CategoryProps>`
  font-family: "DM Sans";
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 8px;
  color: ${({ theme, category }) => getColorFromCategory({ theme, category })};
`;
const CategoryAmount = styled(Text)<CategoryProps>`
  font-family: "PT Mono";
  font-size: 16px;
  line-height: 24px;
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
              let color = theme.neutral.get(5)!;
              if (index === 0) color = theme.green;
              if (index === 1) color = theme.orange;

              return (
                <PieChartSegment
                  key={Crypto.randomUUID()}
                  angle={startAngles[index]}
                  percent={p}
                  progress={progress}
                  color={color}
                />
              );
            })}
          </Svg>
        </PieWrapper>
        <TotalAmount>{getLargeNumberAbbreviation(total)}</TotalAmount>
      </RelativeWrapper>
      <CategoryCardsWrapper>
        {data.map((value, index) => {
          let category = Category.Uncategorized;
          if (index === 0) category = Category.MustHave;
          if (index === 1) category = Category.NiceToHave;
          return (
            <CategoryCard>
              <CategoryLabel category={category}>{category}</CategoryLabel>
              <CategoryAmount category={category}>
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
