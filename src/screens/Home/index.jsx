import { COLORS, SIZES } from '@/assets/Theme';
import AddButton from '@/components/AddButton';
import TodoCard from '@/components/TodoCard';
import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

export default function Home() {
  const data = [1, 2, 4, 8, 7, 9, 1, 1, 2, 4, 7];

  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <TextInput
          placeholder="Pesquisar..."
          clearButtonMode="always"
          style={{
            backgroundColor: COLORS.bgContrast,
            padding: 5,
            borderRadius: 12,
            margin: 10,
          }}
        />
      </View> */}
      <AddButton />
      <FlatList
        data={data}
        renderItem={TodoCard}
        fadingEdgeLength={25}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.medium,
    position: 'relative',
  },
});
