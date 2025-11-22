import 'intl-pluralrules';
import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, BalooTamma2_400Regular, BalooTamma2_800ExtraBold } from '@expo-google-fonts/baloo-tamma-2';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

import './i18n'; // Importar configuración de i18n
import Login from './tabs/Login';
import Register from './tabs/Register';
import Home from './tabs/Home';
import Home_empty from './tabs/Home_empty';
import Home_stack from './tabs/Home_stack';
import Search from './tabs/Search';
import Profile from './tabs/Profile';
import Result from './tabs/Result';
import StartPage from './tabs/StartPage';

// Mantener la pantalla de carga visible mientras se cargan los recursos
SplashScreen.preventAutoHideAsync().catch(console.warn);

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    BalooTamma2_400Regular,
    BalooTamma2_800ExtraBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartPage">
          <Stack.Screen name="StartPage" component={StartPage} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Home_empty" component={Home_empty} options={{ headerShown: false }} />
          <Stack.Screen name="Home_stack" component={Home_stack} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="Result" component={Result} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
