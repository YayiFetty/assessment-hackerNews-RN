import { View, FlatList , Animated, StyleSheet} from 'react-native'
import React, { useRef, useState } from 'react'
import NextButton from '../../components/NextButton';
import Paginator from '../../components/paginator';
import { slides } from '../../utils/slides';
import OnboardingItem from '../../components/OnboardingItem';
import { useNavigation } from '@react-navigation/native';


const Onboarding= () => {
  const [currentIndex, setCurrentIndex]= useState(0);
  const scrollX= useRef(new Animated.Value(0)).current
 
  const viewableItemsChanged = useRef(({viewableItems}) => setCurrentIndex(viewableItems[0].index)).current;
  const slideRef= useRef(null)
  const viewConfig = useRef({viewAreaCoveragePercentThreshold:50}).current;
  const navigation = useNavigation();
  const scrollTo = () =>{
    if(currentIndex < slides.length -1 ){
      slideRef.current.scrollToIndex({index: currentIndex + 1})
    }
    else{
      console.log("Last Item")
    }
  }

  
  const handleOnboardingComplete = () => {
    navigation.navigate('loginS')
  }
  return (
    <View style={styles.container}>
        <FlatList
        data={slides}
        renderItem={({item}) => <OnboardingItem item={item}/>}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id.toString()} 
        pagingEnabled
        onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollX}}}],{
          useNativeDriver:false
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
         viewabilityConfig={viewConfig}
        ref={slideRef}
        />
        <Paginator data ={slides} scrollX={scrollX}/>
        <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} 
        onboardingComplete={handleOnboardingComplete}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff"
  }
})


export default Onboarding