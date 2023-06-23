export enum Category {
  MustHave = "Must have",
  NiceToHave = "Nice to have",
  Uncategorized = "Uncategorized",
}

export enum Font {
  DM_MONO = "DM Mono",
  DM_SANS = "DM Sans",
  PT_MONO = "PT Mono",
}

export interface TypographyProps {
  size: TypographySize;
  isNumber?: boolean;
}

export interface CategoryProps {
  category: Category;
}

export interface Transaction {
  id: string;
  amount: number;
  tags: Array<string>;
  timestamp: ReturnType<Date["getTime"]>;
  category: Category;
}

export type TypographySize =
  | "Label/M"
  | "Body/S"
  | "Body/M"
  | "Title/S"
  | "Title/M"
  | "Title/L"
  | "Headline/M"
  | "Headline/L";

export const typographySizeMap = new Map<TypographySize, number>([
  ["Label/M", 11],
  ["Body/S", 13],
  ["Body/M", 16],
  ["Title/S", 19],
  ["Title/M", 23],
  ["Title/L", 28],
  ["Headline/M", 23],
  ["Headline/L", 40],
]);
