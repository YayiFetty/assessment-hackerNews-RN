import React from 'react';

import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import AboutScreen from '../../tabs/AboutScreen';


const Stack = createStackNavigator();

const AboutNavigation = () => {
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
        name="AboutScreen"
        component={AboutScreen}
        options={{ headerShown: false }}
      />
    
    </Stack.Navigator>
  );
};

export default AboutNavigation;