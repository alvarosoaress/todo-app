import ColorPicker, {
  BrightnessSlider,
  HueSlider,
  InputWidget,
  Panel1,
  Preview,
  Swatches,
} from 'reanimated-color-picker';
import React, { useState } from 'react';
import { MotiView } from 'moti';
import { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { COLORS, FONT, SIZES } from '@/assets/Theme';

export default function Tags({ navigation }) {
  const [mainColor, setMainColor] = useState('#000');
  const [textColor, setTextColor] = useState(COLORS.text);
  const [presetColors, setPresetColors] = useState('none');

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.background,
        flex: 1,
        padding: SIZES.medium,
        gap: SIZES.xxLarge,
      }}
    >
      <ColorPicker
        style={{ width: '70%', alignSelf: 'center', gap: SIZES.medium }}
        onComplete={(color) => setMainColor(color.hex)}
        value={mainColor}
        thumbColor={COLORS.bgContrast}
      >
        <Preview
          hideInitialColor
          style={{ width: '100%', height: 50, top: 0 }}
          hideText
        />
        <InputWidget
          formats="HEX"
          disableAlphaChannel
          inputTitleStyle={{ display: 'none' }}
          iconStyle={{ display: 'none' }}
          inputStyle={{
            color: textColor,
            borderWidth: 0,
            width: '110%',
            height: 50,
          }}
          containerStyle={{
            position: 'absolute',
            width: '100%',
            height: 50,
            top: 0,
          }}
        />
        <Panel1 />
        <HueSlider />

        <View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              backgroundColor: COLORS.gray,
              padding: SIZES.small,
              borderRadius: SIZES.small,
              borderBottomStartRadius:
                presetColors === 'none' ? SIZES.small : 0,
              borderBottomEndRadius: presetColors === 'none' ? SIZES.small : 0,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: SIZES.xxSmall,
              paddingBottom:
                presetColors === 'none' ? SIZES.small : SIZES.large,
            }}
            onPress={() =>
              presetColors === 'none'
                ? setPresetColors('flex')
                : setPresetColors('none')
            }
          >
            <Text
              style={{
                color: COLORS.text,
                textAlign: 'center',
                alignSelf: 'center',
                fontFamily: FONT.lightText,
              }}
            >
              Cores Predefinidas
            </Text>
            <Entypo
              name={
                presetColors === 'none'
                  ? 'chevron-small-down'
                  : 'chevron-small-up'
              }
              size={18}
              color={COLORS.bgContrast}
            />
          </TouchableOpacity>

          <MotiView
            entering={FadeInUp}
            style={{
              display: presetColors,
              backgroundColor: COLORS.gray,
              borderRadius: SIZES.small,
              padding: SIZES.xxSmall,
              borderTopEndRadius: 0,
              borderTopStartRadius: 0,
            }}
          >
            <Swatches />
          </MotiView>
        </View>
      </ColorPicker>

      <ColorPicker
        style={{
          width: '70%',
          alignSelf: 'center',
        }}
        value={COLORS.text}
        onComplete={(color) => setTextColor(color.hex)}
        thumbColor={COLORS.bgContrast}
      >
        <Text
          style={{
            color: textColor,
            textAlign: 'center',
            fontFamily: FONT.lightText,
          }}
        >
          Cor do texto
        </Text>
        <Swatches colors={['#000', '#FFF']} />
        <BrightnessSlider adaptSpectrum />
      </ColorPicker>
    </SafeAreaView>
  );
}
