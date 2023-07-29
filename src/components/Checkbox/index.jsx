import { COLORS, FONT } from '@/assets/Theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function Checkbox({ fillColor, text, onPress }) {
  return (
    <BouncyCheckbox
      size={25}
      fillColor={fillColor}
      unfillColor={COLORS.bgContrast}
      text={text}
      iconComponent={<Feather name="hash" size={16} color="white" />}
      iconStyle={styles.iconStyle}
      innerIconStyle={styles.innerIconStyle}
      textStyle={styles.textStyle}
      onPress={() => onPress}
    />
  );
}

const styles = StyleSheet.create({
  iconStyle: { borderColor: 'red' },
  innerIconStyle: {
    borderWidth: 2,
  },
  textStyle: {
    textDecorationLine: 'none',
    color: COLORS.text,
    fontFamily: FONT.regularText,
  },
});
