import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '@/assets/Theme';
import { useNavigation } from '@react-navigation/native';

export default function AddButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('addTodo')}
    >
      <Entypo name="plus" size={24} color={COLORS.bgContrast} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.medium,
    bottom: SIZES.xxLarge,
    right: SIZES.large,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
});
