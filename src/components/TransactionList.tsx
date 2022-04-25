import React from 'react';
import { View } from 'react-native';

import { useSelector } from '../redux/store';
import { selectDisplayTransactions } from '../redux/transaction-slice';

import TransactionItem from './TransactionItem';

const TransactionList: React.FC = () => {
  const transactions = useSelector((state) =>
    selectDisplayTransactions(state, {
      from: new Date('2021-01-01'),
      to: new Date(),
    }),
  );
  console.log(transactions);

  return (
    <View>
      {transactions.map((t) => (
        <TransactionItem key={t.id} item={t} />
      ))}
    </View>
  );
};

export default TransactionList;
