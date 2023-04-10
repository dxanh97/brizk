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
