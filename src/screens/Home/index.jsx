import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';
import { COLORS, SIZES } from '@/assets/Theme';
import AddButton from '@/components/AddButton';
import TodoCard from '@/components/TodoCard';
import { getTodos } from '@/database';

export default function Home() {
  const data = [1, 2, 4, 8, 7, 9, 1, 1, 2, 4, 5, 7];
  const [todos, setTodos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getTodos().then((res) => setTodos(res));
    }, []),
  );

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
      {/* <Pressable
        onPress={() => console.log(todos)}
        style={{ width: 50, height: 50, backgroundColor: 'red' }}
      /> */}
      <AddButton />
      <FlatList
        data={data}
        renderItem={({ item, index }) => <TodoCard index={index} />}
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
