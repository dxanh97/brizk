import { DefaultTheme } from "styled-components";
import { DateTime } from "luxon";
import { groupBy, keys, pickBy } from "lodash";

import { Category, Transaction } from "./types";

export const hexToRGBA = (hex: string, alpha: number) => {
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
export const getColorFromCategory = ({
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

export const formatAmount = (amount: number) =>
  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const getStartOfTheDay = (timestamp: Transaction["timestamp"]) => {
  const miliseconds = new Date(timestamp).setHours(0, 0, 0);
  return miliseconds;
};

export const getDateString = (timestamp: Transaction["timestamp"]) => {
  const date = DateTime.fromMillis(getStartOfTheDay(timestamp));
  return date.toISODate();
};

export const getMonthAndYear = (timestamp: Transaction["timestamp"]) => {
  const dateString = getDateString(timestamp);
  return dateString.slice(0, 7);
};

export const groupTransactionsByDates = (
  transactions: Transaction[],
  categories: Category[] = [],
) => {
  const filteredTransactions =
    categories.length === 0
      ? transactions
      : transactions.filter((t) => categories.includes(t.category));
  const groups = groupBy(filteredTransactions, (t) => {
    const dateMiliseconds = getStartOfTheDay(t.timestamp);
    const date = DateTime.fromMillis(dateMiliseconds);
    return date.setLocale("en").toLocaleString(DateTime.DATE_FULL);
  });
  const data = Object.entries(groups)
    .map(([date, transactionList]) => [date, ...transactionList])
    .flat();
  const dateIndexes = keys(pickBy(data, (t) => typeof t === "string")).map(
    (i) => parseInt(i, 10),
  );

  return {
    dateIndexes,
    data,
  };
};

export const getLargeNumberAbbreviation = (n: number) => {
  if (n >= 1e12) return `${+(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `${+(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${+(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${+(n / 1e3).toFixed(1)}K`;
  return n;
};
