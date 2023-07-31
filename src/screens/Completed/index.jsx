import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '@/assets/Theme';
import TodoCard from '@/components/TodoCard';
import { getTodos } from '@/database';

export default function Completed() {
  const [todos, setTodos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // Filtrando o res para exibir apenas os ToDos incompletos
      // Organizando a partir da data de criação usando sort()
      getTodos().then((res) =>
        setTodos(
          res
            .filter((item) => item.completed)
            .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds),
        ),
      );
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

      <FlatList
        data={todos}
        renderItem={({ item, index }) => <TodoCard index={index} todo={item} />}
        keyExtractor={(item) => item?.id}
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
  },
});
