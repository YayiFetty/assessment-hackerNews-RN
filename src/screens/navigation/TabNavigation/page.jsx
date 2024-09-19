
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeNavigation from './HomeNavigation'
import AboutNavigation from './AboutNavigation'
import { Ionicons } from '@expo/vector-icons'
import { TransitionPresets } from '@react-navigation/stack'


const Tab = createBottomTabNavigator()
const TabNavigation = () => {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if(route.name === "Home"){
          iconName = "home"
        }
        else if(route.name === "About"){
          iconName = "information-circle-outline"
        }

        const customSize = 25;

        return(
          <Ionicons name={iconName} size={customSize} color={focused ? "#164b48" : "gray"} />
        )
      },
      tabBarActiveTintColor: "#164b48",
      tabBarInactiveTintColor: "gray",
      tabBarShowLabel:{
        fontSize:12,
        fontWeight:"bold"
      },
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
    })}>
        <Tab.Screen name="Home" component={HomeNavigation} />
        <Tab.Screen name ="About" component={AboutNavigation} />
       
      </Tab.Navigator>
  )
}

export default TabNavigation