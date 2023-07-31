import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { COLORS, FONT, SIZES } from '@/assets/Theme';
import HeaderBtn from '@/components/HeaderBtn';
import AddButton from '@/components/AddButton';
import Home from '../Home';
import AddTodo from '../AddTodo';
import Config from '../Config';
import TodoDetails from '../TodoDetails';
import Completed from '../Completed';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Componente necessário para BottomTabBar Screen poder existir
function MockComponent() {
  return <View style={{ flex: 1, backgroundColor: 'red' }} />;
}

function BottomTabNavigation() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.gray,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontFamily: FONT.lightText,
          marginBottom: 5,
        },
        tabBarInactiveTintColor: COLORS.gray2,
        tabBarActiveTintColor: COLORS.text,
      }}
    >
      <Tab.Screen
        name="homeTab"
        component={Home}
        options={{
          tabBarLabel: 'A fazer',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'book-clock' : 'book-clock-outline'}
              size={24}
              color={COLORS.bgContrast}
            />
          ),
        }}
      />
      <Tab.Screen
        name="addTodoTab"
        component={MockComponent}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <AddButton onPress={() => navigation.navigate('addTodo')} />
          ),
        }}
        // Listener para cancelar o navigate para o MockComponent
        // e redirecionar o usuário para o navigate do AddButton
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
          },
        })}
      />
      <Tab.Screen
        name="completedTab"
        component={Completed}
        options={{
          tabBarLabel: 'Completos',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'book-check' : 'book-check-outline'}
              size={24}
              color={COLORS.bgContrast}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={BottomTabNavigation} />
      <Stack.Screen
        name="addTodo"
        component={AddTodo}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="todoDetails"
        component={TodoDetails}
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
            // Abrindo o drawer com o botão Left da HeaderBtn
            // Usando dispatch para disparar um evento ao ser clicado
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
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={COLORS.bgContrast}
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
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'cog' : 'cog-outline'}
              size={24}
              color={COLORS.bgContrast}
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
