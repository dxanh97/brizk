export enum Category {
  MustHave = "Must have",
  NiceToHave = "Nice to have",
  Uncategorized = "Uncategorized",
}

export interface Transaction {
  id: string;
  amount: number;
  tags: Array<string>;
  timestamp: ReturnType<Date["getTime"]>;
  category: Category;
}
