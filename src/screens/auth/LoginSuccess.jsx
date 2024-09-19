import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../service/AuthContext';
 // Adjust the import path as needed

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const LoginSuccess = () => {
  const navigation = useNavigation();
  const { setSession } = useAuth();
  const circleAnimation = new Animated.Value(0);
  const checkAnimation = new Animated.Value(0);

  useEffect(() => {
    // Animate the circle
    Animated.timing(circleAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animate the check mark
    Animated.timing(checkAnimation, {
      toValue: 1,
      duration: 500,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Navigate to TabScreen after 4 seconds
    const timer = setTimeout(() => {
      setSession(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const circleStrokeDashoffset = circleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [250, 0],
  });

  const checkStrokeDashoffset = checkAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <View style={styles.container}>
      <Svg height="200" width="200" viewBox="0 0 100 100">
        <AnimatedCircle
          cx="50"
          cy="50"
          r="40"
          stroke="#4CAF50"
          strokeWidth="4"
          fill="none"
          strokeDasharray={250}
          strokeDashoffset={circleStrokeDashoffset}
        />
        <AnimatedPath
          d="M30 50 L45 65 L70 40"
          fill="none"
          stroke="#4CAF50"
          strokeWidth="4"
          strokeDasharray={50}
          strokeDashoffset={checkStrokeDashoffset}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default LoginSuccess;