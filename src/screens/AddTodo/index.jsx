import { COLORS, FONT, SIZES } from '@/assets/Theme';
import Checkbox from '@/components/Checkbox';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddTodo() {
  const navigation = useNavigation();

  const [description, setDescription] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState(0);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={styles.container}
      // Ao tocar no background esconda o modal
      onTouchEnd={() => navigation.goBack()}
    >
      <ScrollView
        // contentContainerStyle modifica as props dos childrens
        // gap é uma prop que mexe diretamente com children então é necessário
        contentContainerStyle={{ gap: SIZES.xxLarge }}
        // Fazer com que o teclado suma ao tocar no foreground do modal
        keyboardShouldPersistTaps="handled"
        style={[
          styles.wrapper,
          { height: isKeyboardVisible ? '100%' : styles.wrapper.height },
        ]}
        // Prevenindo que ao tocar no foreground esconda todo o modal
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <Text style={styles.title}>Novo ToDo</Text>

        <TextInput style={styles.textInput} placeholder="Título" />

        <TextInput
          placeholder="Descrição"
          multiline
          textAlignVertical="top"
          onChangeText={(text) => setDescription(text)}
          // Chamado quando o texto muda de tamanho
          // Mudando o tamanho do textInput baseado no tamanho do texto
          onContentSizeChange={(event) =>
            setTextAreaHeight(event.nativeEvent.contentSize.height)
          }
          style={[styles.textArea, { height: Math.max(150, textAreaHeight) }]}
        />

        <Checkbox text="Urgente" fillColor="red" />

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text}>Adicionar</Text>
        </TouchableOpacity>
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
    // flexGrow 0 pois scrollView vem com 1 de default
    flexGrow: 0,
    width: '90%',
    height: '70%',
    gap: SIZES.xxLarge,
    backgroundColor: COLORS.gray,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
  },
  textInput: {
    height: 40,
    padding: SIZES.xSmall,
    borderRadius: SIZES.small,
    color: COLORS.gray,
    fontSize: SIZES.medium,
    fontFamily: FONT.boldText,
    backgroundColor: COLORS.bgContrast,
  },
  textArea: {
    height: 150,
    padding: SIZES.xSmall,
    borderRadius: SIZES.small,
    color: COLORS.gray,
    fontSize: SIZES.medium,
    fontFamily: FONT.regularText,
    backgroundColor: COLORS.bgContrast,
  },
  text: {
    color: COLORS.text,
  },
  title: {
    fontFamily: FONT.boldText,
    fontSize: SIZES.xLarge,
    textAlign: 'center',
    color: COLORS.text,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: '80%',
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
});
