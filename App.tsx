// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './tabs/Login'; // Asegúrate de que las rutas sean correctas
import Register from './tabs/Register'; // Asegúrate de que las rutas sean correctas
import Home from './tabs/Home';
import Home_empty from './tabs/Home_empty';
import Home_stack from './tabs/Home_stack';
import Search from './tabs/Search';
import Profile from './tabs/Profile';
import 'intl-pluralrules';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Home_empty" component={Home_empty} options={{ headerShown: false }} />
        <Stack.Screen name="Home_stack" component={Home_stack} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
