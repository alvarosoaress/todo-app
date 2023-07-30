import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT, SIZES } from '@/assets/Theme';
import HeaderBtn from '@/components/HeaderBtn';
import Home from '../Home';
import AddTodo from '../AddTodo';
import Config from '../Config';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigation() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => (
            <HeaderBtn
              iconName="menu"
              dimension={28}
              handlePress={() =>
                navigation.dispatch(DrawerActions.openDrawer())
              }
            />
          ),
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

function DrawerNavigation() {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: 'left',
        headerStyle: { backgroundColor: COLORS.gray },
        headerTitleStyle: {
          fontFamily: FONT.boldText,
          color: COLORS.text,
          marginLeft: -SIZES.xxSmall,
        },
        headerTintColor: COLORS.bgContrast,

        drawerStyle: { backgroundColor: COLORS.gray },
        drawerInactiveBackgroundColor: COLORS.gray,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.bgContrast,
        drawerLabelStyle: {
          fontFamily: FONT.boldText,
          color: COLORS.text,
          fontSize: SIZES.medium,
          marginLeft: -SIZES.large,
        },

        headerLeft: () => (
          <HeaderBtn
            iconName="menu"
            dimension={30}
            handlePress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
      }}
    >
      <Drawer.Screen
        name="homeDrawer"
        component={StackNavigation}
        options={{
          headerTitle: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="config"
        component={Config}
        options={{
          headerTitle: 'Configurações',
          drawerLabel: 'Configurações',
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}
