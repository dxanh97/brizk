import React from 'react';
import { Text, View } from 'react-native';

const TransactionItem: React.FC<{
  item: TransactionVM;
}> = ({ item }) => {
  return (
    <View>
      <Text>{item.amount}</Text>
      <Text>{item.category}</Text>
      {item.tags.map((t) => (
        <Text key={t.id}>{t.label}</Text>
      ))}
    </View>
  );
};

export default TransactionItem;
