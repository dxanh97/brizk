export enum Category {
  NiceToHave = "Nice to have",
  MustHave = "Must have",
  Uncategorized = "Uncategorized",
}

export interface Transaction {
  id: string;
  amount: number;
  tags: Array<string>;
  timestamp: ReturnType<Date["getTime"]>;
  category?: Category;
}
