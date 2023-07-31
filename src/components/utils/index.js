import { showMessage } from 'react-native-flash-message';
import { COLORS, FONT, SIZES } from '@/assets/Theme';

export function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

export function toastWarn(message) {
  return showMessage({
    message: 'Atenção !',
    description: message,
    icon: 'warning',
    // iconProps: { tintColor: 'red' },
    style: { backgroundColor: COLORS.gray, marginTop: SIZES.xxLarge },
    textStyle: {
      color: COLORS.text,
      fontFamily: FONT.lightText,
      fontSize: SIZES.medium,
    },
    titleStyle: { color: COLORS.text, fontFamily: FONT.lightText },
  });
}

export function toastSuccess(message) {
  return showMessage({
    message: 'Sucesso !',
    description: message,
    icon: 'success',
    // iconProps: { tintColor: 'green' },
    style: { backgroundColor: COLORS.gray, marginTop: SIZES.xxLarge },
    textStyle: {
      color: COLORS.text,
      fontFamily: FONT.lightText,
      fontSize: SIZES.medium,
    },
    titleStyle: { color: COLORS.text, fontFamily: FONT.lightText },
  });
}
