/* eslint-disable global-require */
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Routes from '@/screens/Routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '@/assets/Theme';

export default function App() {
  // Carregando as fontes locais
  const [fontsLoaded] = useFonts({
    REMLight: require('@/assets/fonts/REM-Light.ttf'),
    REMRegular: require('@/assets/fonts/REM-Regular.ttf'),
    REMBold: require('@/assets/fonts/REM-Bold.ttf'),

    // SFPRODisplayBold: require('@/assets/fonts/SF-Pro-Display-Bold.otf'),
    // SFPRODisplayRegular: require('@/assets/fonts/SF-Pro-Display-Regular.otf'),
    // SFPRODisplayMedium: require('@/assets/fonts/SF-Pro-Display-Medium.otf'),
    // SFPROTextBold: require('@/assets/fonts/SF-Pro-Text-Bold.otf'),
    // SFPROTextRegular: require('@/assets/fonts/SF-Pro-Text-Regular.otf'),
    // SFPROTextMedium: require('@/assets/fonts/SF-Pro-Text-Medium.otf'),
  });

  // Mostrando SplashScreen até hideAsync ser chamado
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) return null;

  // Chegou aqui então fontsLoaded é true então podemos esconder a Splash
  SplashScreen.hideAsync();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
