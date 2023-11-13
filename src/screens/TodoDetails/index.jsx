import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ZoomIn } from 'react-native-reanimated';
import { SafeAreaView, ScrollView } from 'moti';
import { COLORS, FONT, SIZES } from '@/assets/Theme';
import CloseBtn from '@/components/CloseBtn';
import { completeTodo } from '@/database';
import { toastSuccess } from '@/components/utils';

export default function TodoDetails({ navigation, route }) {
  const { todo } = route.params;

  let fireBaseTimeCompleted = null;

  if (todo.completedAt) {
    fireBaseTimeCompleted = new Date(
      todo.completedAt.seconds * 1000 + todo.createdAt.nanoseconds / 1000000,
    );
  }

  const fireBaseTime = new Date(
    todo.createdAt.seconds * 1000 + todo.createdAt.nanoseconds / 1000000,
  );

  async function handleComplete(id) {
    await completeTodo(id);
    // Verificação para lidar com erro de production
    if (navigation.canGoBack()) {
      navigation.goBack();
      toastSuccess('ToDo completado! Parabéns!');
    } else {
      console.log('Error in TodoDetails handleComplete goBack()');
    }
  }

  return (
    <SafeAreaView
      style={styles.container}
      // Ao tocar no background esconda o modal
      onTouchEnd={() => navigation.goBack()}
    >
      <ScrollView
        entering={ZoomIn}
        style={styles.wrapper}
        onTouchEnd={(e) => e.stopPropagation()}
        contentContainerStyle={{
          gap: SIZES.large,
        }}
      >
        <CloseBtn navigation={navigation} />

        <Text style={styles.title}>{todo?.title}</Text>

        {todo?.description ? (
          <Text
            style={styles.description}
            selectable
            selectionColor={COLORS.primary}
          >
            {todo?.description}
          </Text>
        ) : null}

        <View style={styles.tagContainer}>
          <Text style={styles.tag}>#TAG 1</Text>
          <Text style={styles.tag2}>#TAG 2</Text>
          <Text style={styles.tag3}>#TAG 3</Text>
        </View>

        <Text style={styles.text}>
          Criado em:{' '}
          {fireBaseTime.toLocaleDateString('pt-br', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </Text>

        {todo?.completedAt ? (
          <Text style={styles.text}>
            Concluído em:{' '}
            {fireBaseTimeCompleted.toLocaleDateString('pt-br', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        ) : null}

        {todo?.completedAt ? null : (
          <TouchableOpacity style={styles.btn}>
            <Text
              style={styles.btnText}
              onPress={() => handleComplete(todo?.id)}
            >
              Completar
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '90%',
    flexGrow: 0,
    backgroundColor: COLORS.gray,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    gap: SIZES.large,
  },
  description: {
    color: COLORS.text,
    fontFamily: FONT.lightText,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.xxSmall,
    padding: SIZES.small,
  },
  text: { color: COLORS.text },
  title: {
    fontFamily: FONT.boldText,
    fontSize: SIZES.xLarge,
    textAlign: 'center',
    color: COLORS.text,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    height: SIZES.large * 2.5,
    marginVertical: SIZES.medium,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  btnText: {
    color: COLORS.text,
    fontSize: SIZES.medium,
    fontFamily: FONT.lightText,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: SIZES.medium,
    alignItems: 'center',
  },
  tag: {
    color: COLORS.bgContrast,
    backgroundColor: COLORS.accent,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    padding: SIZES.xxSmall,
    fontSize: SIZES.small,
    borderRadius: SIZES.xSmall,
    fontFamily: FONT.lightText,
  },
  tag2: {
    color: COLORS.bgContrast,
    backgroundColor: COLORS.tertiary,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    padding: SIZES.xxSmall,
    fontSize: SIZES.small,
    borderRadius: SIZES.xSmall,
    fontFamily: FONT.lightText,
  },
  tag3: {
    color: COLORS.bgContrast,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    padding: SIZES.xxSmall,
    fontSize: SIZES.small,
    borderRadius: SIZES.xSmall,
    fontFamily: FONT.lightText,
  },
});
