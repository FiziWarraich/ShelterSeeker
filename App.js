/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './ScreenStack/SplashScreen';
import HomeScreen from './ScreenStack/HomeScreen';
const Stack=createNativeStackNavigator();
const App=()=>
{
return(
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Splash' component={SplashScreen}/>
      <Stack.Screen name='Home' component={HomeScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
)
};


export default App;
