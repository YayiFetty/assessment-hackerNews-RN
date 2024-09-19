import { View, Text, Image, useWindowDimensions, StyleSheet } from 'react-native'
import React from 'react'

const OnboardingItem = ({item}) => {
    const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
        <Image source={item.image} style={[styles.image, {width, resizeMode:"contain"}]}/>

        <View style={{flex:0.3}}>
          <Text style = {styles.title}>{item.title}</Text>
          <Text style = {styles.description}>{item.description}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifycontent:"center",
    alignItems:"center"
  },
  title:{
    fontWeight:"800",
    fontSize:28, 
    marginBottom:19,
    color:"#493d8a",
    textAlign:"center"
  },
  image:{
    flex:0.7,
    justifycontent:"center"
  },
  title:{
    fontWeight:"800",
    fontSize:22,
    marginBottom:10,
    color:"#492d8a",
    textAlign:"center"
  },
  description:{
    fontWeight:"300",
    color:"#62656b",
    textAlign:"center",
    paddingHorizontal:22
  }
  
})



export default OnboardingItem