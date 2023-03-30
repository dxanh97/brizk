import { DefaultTheme } from "styled-components";
import { Category } from "./types";

const hexToRGBA = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
};

const { MustHave, NiceToHave } = Category;
interface GetColorFromCategoryArgs {
  theme: DefaultTheme;
  category: Category;
  neutralShade?: number;
  opacity?: number;
  neutralOpacity?: number;
}
const getColorFromCategory = ({
  theme,
  category,
  neutralShade = 13,
  opacity = 1,
  neutralOpacity = 1,
}: GetColorFromCategoryArgs) => {
  if (category === MustHave) return hexToRGBA(theme.green, opacity);
  if (category === NiceToHave) return hexToRGBA(theme.orange, opacity);
  return hexToRGBA(theme.neutral.get(neutralShade)!, neutralOpacity);
};

export { hexToRGBA, getColorFromCategory };
