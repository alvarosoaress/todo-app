import React, { useEffect, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  Keyboard,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { COLORS, FONT, SIZES } from '@/assets/Theme';
import Checkbox from '@/components/Checkbox';
import { isBlank, toastSuccess, toastWarn } from '@/components/utils';
import { addTodo } from '@/database';
import CloseBtn from '@/components/CloseBtn';

export default function AddTodo({ navigation }) {
  const [title, setTitle] = useState('');

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

  async function handleSubmit() {
    if (!isBlank(title)) {
      await addTodo(title, description);
      navigation.goBack();
      toastSuccess('ToDo adicionado com sucesso!');
    } else {
      toastWarn('O título é obrigatório');
    }
  }

  return (
    <SafeAreaView
      style={styles.container}
      // Ao tocar no background esconda o modal
      onTouchEnd={() => navigation.goBack()}
    >
      <Animated.FlatList
        entering={ZoomIn}
        data={[1, 2, 5, 4]}
        style={styles.flatList}
        contentContainerStyle={{ gap: SIZES.xxLarge }}
        // Prevenindo que ao tocar no foreground esconda todo o modal
        onTouchEnd={(e) => e.stopPropagation()}
        ListHeaderComponent={
          <View
            style={[
              styles.wrapper,
              { height: isKeyboardVisible ? '100%' : styles.wrapper.height },
            ]}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <CloseBtn navigation={navigation} />

            <Text style={styles.title}>Novo ToDo</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Título..."
              onChangeText={setTitle}
            />

            <TextInput
              placeholder="Descrição..."
              multiline
              textAlignVertical="top"
              onChangeText={setDescription}
              // onContentSizeChange Chamado quando o texto muda de tamanho
              // Mudando o tamanho do TextInput baseado no tamanho do texto
              onContentSizeChange={(event) =>
                setTextAreaHeight(event.nativeEvent.contentSize.height)
              }
              style={[
                styles.textArea,
                { height: Math.max(SIZES.xxLarge * 5, textAreaHeight) },
              ]}
            />
          </View>
        }
        numColumns={2}
        columnWrapperStyle={{ gap: SIZES.large * 2, alignSelf: 'center' }}
        // Trocar text para item especifico
        renderItem={({ item }) => <Checkbox text="Urgente" fillColor="red" />}
        ListFooterComponent={
          <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
            <Text style={styles.btnText}>Adicionar</Text>
          </TouchableOpacity>
        }
      />
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
  flatList: {
    // flexGrow 0 pois FlatList vem com 1 de default
    flexGrow: 0,
    width: '90%',
    backgroundColor: COLORS.gray,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
  },
  wrapper: {
    gap: SIZES.xxLarge,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
  },
  textInput: {
    height: SIZES.large * 2,
    padding: SIZES.xSmall,
    borderRadius: SIZES.small,
    color: COLORS.gray,
    fontSize: SIZES.medium,
    fontFamily: FONT.boldText,
    backgroundColor: COLORS.bgContrast,
  },
  textArea: {
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
});
