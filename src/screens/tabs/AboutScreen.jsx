import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const AboutScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const renderSection = (title, content, index) => {
    const delay = index * 200;
    return (
      <Animated.View
        style={[
          styles.section,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </Animated.View>
    );
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradient}
    >
      <ScrollView style={styles.container}>
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          About Yayi Muhammed
        </Animated.Text>
        
        {renderSection(
          "Tech Life",
          "Yayi Muhammed is a passionate software engineer with over 5 years of experience in mobile and web development. Specializing in React Native and React.js, Yayi has been at the forefront of creating innovative mobile solutions for various industries.",
          0
        )}

        {renderSection(
          "Achievements in Tech Projects",
          "• Led the development of a popular e-commerce app with over 1 million downloads\n• Contributed to an open-source React Native navigation library, improving performance by 30%\n• Developed a real-time collaborative coding platform used by top tech companies for remote interviews",
          1
        )}

        {renderSection(
          "Conferences and Speaking Engagements",
          "• Speaker at React Native Europe 2023: \"Optimizing Performance in Large-Scale React Native Apps\"\n• Workshop leader at Mobile Dev Summit 2022: \"Building Accessible React Native Applications\"\n• Panelist at AfricaTech Conference 2021: \"The Future of Mobile Development in Africa\"",
          2
        )}

        {renderSection(
          "Current Project",
          "Yayi is currently working on a React Native app that leverages the Hacker News API to provide a seamless mobile experience for tech enthusiasts. The app features the latest top stories, implements infinite scrolling, and includes user authentication using SQLite.",
          3
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  section: {
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#ffffff',
  },
});

export default AboutScreen;