import { COLORS, FONT, SIZES } from '@/assets/Theme';
import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TodoCard({ index }) {
  return (
    <MotiView
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
      <Text style={styles.title}>Titulo</Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit tenetur
        cupiditate perferendis, saepe architecto, dolorum officiis aliquid
        incidunt ...
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>TAG 1</Text>
          <Text style={styles.tag2}>TAG 2</Text>
          <Text style={styles.tag3}>TAG 3</Text>
        </View>
        <Text style={styles.text}>0 dias</Text>
      </View>
    </MotiView>
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
