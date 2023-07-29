import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { COLORS, FONT } from '@/assets/Theme';
import HeaderBtn from '@/components/HeaderBtn/HeaderBtn';
import Home from '../Home';
import AddTodo from '../AddTodo';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        statusBarTranslucent: true,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: COLORS.gray },
        headerTitleStyle: { fontFamily: FONT.boldText, color: COLORS.text },
        headerTintColor: COLORS.bgContrast,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => <HeaderBtn iconName="menu" dimension={28} />,
        }}
      />
      <Stack.Screen
        name="addTodo"
        component={AddTodo}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
}
