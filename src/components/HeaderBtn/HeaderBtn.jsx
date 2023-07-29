import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { COLORS, SIZES } from '@/assets/Theme';

export default function HeaderBtn({ iconName, dimension, handlePress }) {
  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container]}>
      <Entypo
        name={iconName}
        style={styles.btnIcon}
        size={dimension}
        color={COLORS.bgContrast}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    width: 25,
    height: 25,
    margin: SIZES.xxSmall,
    textAlign: 'center',
    padding: 0,
  },
});
