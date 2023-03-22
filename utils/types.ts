export const NiceToHave = "Nice to have";
export const MustHave = "Must have";
export type Category = typeof NiceToHave | typeof MustHave;

export interface Transaction {
  id: string;
  amount: number;
  tags: Array<string>;
  timestamp: ReturnType<Date["getTime"]>;
  category?: Category;
}
