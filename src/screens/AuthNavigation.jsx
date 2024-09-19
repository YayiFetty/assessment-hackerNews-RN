import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Onboarding from './auth/OnboardingScreen'
import LoginScreen from './auth/LoginScreen'
import RegistrationScreen from './auth/RegistrationScreen'
import LoginSuccess from './auth/LoginSuccess'
import SplashScreen from './auth/SplashScreen'

const Stack = createStackNavigator()
const AuthNavigation = () => {
  
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS,
      animationEnabled: true,
      gestureEnabled: true,
      gestureDirection: "horizontal",
    }}>
      <Stack.Screen name ="splashS" component={SplashScreen} />
      <Stack.Screen name ="onboardingS" component={Onboarding} />
      <Stack.Screen name ="loginS" component={LoginScreen} /> 
      <Stack.Screen name ="registerS" component={RegistrationScreen} />
      <Stack.Screen name ="successS" component={LoginSuccess} />
    </Stack.Navigator>
  )
}

export default AuthNavigation