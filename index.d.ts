interface Transaction {
  id: string;
  amount: number;
  date: Date;
  tagIds: Array<Tag['id']>;
  category?: 'MUST_HAVE' | 'NICE_TO_HAVE';
}

type TransactionCM = Creatable<Transaction, 'id'> & {
  newTags: string[];
};

type TransactionVM = Omit<Transaction, 'tagIds'> & {
  tags: Tag[];
};

interface Tag {
  id: string;
  label: string;
}

type TagCM = Omit<Tag, 'id'>;

type Editable<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

type Creatable<T, K extends keyof T> = Omit<T, K>;
