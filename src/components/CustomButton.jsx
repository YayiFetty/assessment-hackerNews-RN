import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      style={[
        styles.container,
        containerStyle,
        isLoading && styles.disabled,
      ]}
    >
      <Text style={[styles.text, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0", 
    borderRadius: 16,
    minHeight: 62,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000000", 
    fontSize: 18,
    fontWeight: "600", 
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomButton;
