/* eslint-disable global-require */
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FlashMessage from 'react-native-flash-message';
import Routes from '@/screens/Routes';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  // Carregando as fontes locais
  const [fontsLoaded] = useFonts({
    REMLight: require('@/assets/fonts/REM-Light.ttf'),
    REMRegular: require('@/assets/fonts/REM-Regular.ttf'),
    REMBold: require('@/assets/fonts/REM-SemiBold.ttf'),
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
    <>
      <Routes />
      <FlashMessage position="top" />
    </>
  );
}
