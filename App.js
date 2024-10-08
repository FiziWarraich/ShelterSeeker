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
import { FavoritesProvider } from './Context/FavoritesContext';
import SplashScreen from './ScreenStack/SplashScreen';
import HomeScreen from './ScreenStack/HomeScreen';
import Tabs from './ScreenStack/TabScreen';
import LoginScreen from './ScreenStack/LoginScreen';
import SignupScreen from './ScreenStack/SignupScreen';
import CalculatorScreen from './ScreenStack/CalculatorScreen';
import ProfileScreen from './ScreenStack/ProfileScreen';
import SearchScreen from './ScreenStack/SearchScreen';
import PropertyListScreen from './ScreenStack/PropertyListScreen';
import PropertyDetailScreen from './ScreenStack/PropertyDetailScreen';
import FilterPropertyScreen from './ScreenStack/FilterPropertyScreen';
const Stack=createNativeStackNavigator();
const App=()=>
{
return(
  
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Splash' component={SplashScreen}/>
      <Stack.Screen name='Tab' component={Tabs}/>
      <Stack.Screen name='Home' component={HomeScreen}/>
      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='Signup' component={SignupScreen}/>
      <Stack.Screen name='Calculator' component={CalculatorScreen}/>
      <Stack.Screen name='Profile' component={ProfileScreen}/>
      <Stack.Screen name='Filters' component={SearchScreen}/>
      <Stack.Screen name='PropertyList' component={PropertyListScreen}/>
      <Stack.Screen name='PropertyDetail' component={PropertyDetailScreen}/>
      <Stack.Screen name='FilterProperty' component={FilterPropertyScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  
)
};


export default App;
