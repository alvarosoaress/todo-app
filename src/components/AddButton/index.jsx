import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '@/assets/Theme';

export default function AddButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Entypo name="plus" size={24} color={COLORS.bgContrast} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.xxLarge * 2,
    bottom: SIZES.small,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
});
