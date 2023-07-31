import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function CloseBtn({ navigation }) {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        right: 0,
        zIndex: 100,
      }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="close" size={24} color="white" />
    </TouchableOpacity>
  );
}
