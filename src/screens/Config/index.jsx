import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS, FONT, SIZES } from '@/assets/Theme';

export default function Config({ navigation }) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.background,
        flex: 1,
        flexGrow: 1,
        padding: SIZES.medium,
        gap: SIZES.xxLarge,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.gray,
          flexDirection: 'row',
          alignItems: 'center',
          padding: SIZES.medium,
          gap: SIZES.small,
          borderRadius: SIZES.small,
        }}
        onPress={() => navigation.navigate('tags')}
      >
        <MaterialCommunityIcons name="tag-multiple" size={24} color="white" />
        <Text
          style={{
            color: COLORS.text,
            fontFamily: FONT.lightText,
            fontSize: SIZES.large,
          }}
        >
          Minhas tags
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
