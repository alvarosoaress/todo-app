import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONT, SIZES } from '@/assets/Theme';

export default function TodoCard({ index, todo }) {
  const navigation = useNavigation();

  const fireBaseTime = new Date(
    todo.createdAt.seconds * 1000 + todo.createdAt.nanoseconds / 1000000,
  );

  const currentTime = new Date();

  // Calculando a diferença entre as data em Ms
  const diffMs = Math.abs(currentTime.getTime() - fireBaseTime.getTime());

  // (Ms * 1000 = Secs) (Secs * 60 = Min) (Min * 60 = Hours) (Hours * 24 = Days)
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Contando quantas quebras de linhas existem na descrição
  // Split para que a cada ocorrência de quebra de linha o texto seja cortado
  // gerando um array de textos
  // depois cortando esse array até a 4 posição, e juntando novamente a string
  // separando as linhas com \n
  const todoDescription = todo?.description.split('\n').slice(0, 5).join('\n');

  // length - 1 pois todos textos tem 1 linha de padrão
  // queremos saber apenas as linhas a mais que o texto tenha
  const descriptionLines = todo.description.split('\n').length - 1;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('todoDetails', { todo })}
      activeOpacity={0.6}
      style={styles.container}
      from={{
        opacity: 0,
        translateY: 100,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      transition={{ delay: 100 * index + 35 }}
    >
      <Text style={styles.title}>{todo?.title}</Text>
      <Text style={styles.text}>
        {todoDescription.length > 145 || descriptionLines > 3
          ? `${todoDescription.slice(0, 145)} ...`
          : todoDescription}
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>TAG 1</Text>
          <Text style={styles.tag2}>TAG 2</Text>
          <Text style={styles.tag3}>TAG 3</Text>
        </View>
        <Text style={styles.text}>
          {diffDays} {diffDays > 1 ? 'dias' : 'dia'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.gray,
    gap: SIZES.medium,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginVertical: SIZES.small,
  },
  title: {
    color: COLORS.text,
    fontSize: SIZES.xLarge,
    fontFamily: FONT.boldText,
  },
  text: {
    color: COLORS.text,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: SIZES.medium,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
