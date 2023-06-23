import styled, { css } from "styled-components";
import { Text, View } from "react-native";

import { Font, TypographyProps, typographySizeMap } from "./types";

export const typography = css<TypographyProps>`
  font-family: ${({ isNumber }) => (isNumber ? Font.PT_MONO : Font.DM_SANS)};
  font-size: ${({ size }) => typographySizeMap.get(size)}px;
  line-height: ${({ size }) => typographySizeMap.get(size)! * 1.2}px;
`;

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexCenterBox = styled(View)`
  ${flexCenter};
`;

export const Typography = styled(Text)<TypographyProps>`
  ${typography};
`;
