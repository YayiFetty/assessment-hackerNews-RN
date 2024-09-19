import React from 'react';

import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../tabs/HomeScreen';


const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackground:() => null,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    
    </Stack.Navigator>
  );
};

export default HomeNavigation;